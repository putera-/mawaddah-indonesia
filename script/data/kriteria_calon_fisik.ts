import {
    body_shape,
    eye_Color,
    hair_color,
    hair_type,
    Prisma,
    PrismaClient,
    skin_color,
} from '@prisma/client';
import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';
import { get_lowest_number_from_string } from './helper/get_lowest_number_from_string';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

let count = 0;

export async function kriteria_calon_fisik(
    old_db: mysql.Connection,
    new_db: PrismaClient,
) {
    // const users = await new_db.user.findMany();
    const [kriteria_calon_fisiks]: any[] = await old_db.execute(
        'SELECT * FROM kriteria_calon_fisik',
    );

    for (const kriteria_calon_fisik of kriteria_calon_fisiks) {
        if (isTest) {
            if (count >= 100) {
                process.stdout.write('STOP AT 100 DATA: KRITERIA CALON FISIK');
                break;
            }
            count++;
        }

        process.stdout.write('.');

        const user_id = kriteria_calon_fisik.user_id;

        const bodyShape: body_shape = (() => {
            switch (kriteria_calon_fisik.bentuk_fisik) {
                case 'Sangat Kurus':
                    return body_shape.sangat_kurus;
                case 'Kurus':
                    return body_shape.kurus;
                case 'Atletis':
                    return body_shape.atletis;
                case 'Normal':
                    return body_shape.normal;
                case 'Chubby':
                    return body_shape.gempal;
                case 'Gemuk':
                    return body_shape.gemuk;
                case 'Sangat Gemuk':
                    return body_shape.sangat_gemuk;
                default:
                    return body_shape.normal;
            }
        })();

        const skinColor: skin_color = (() => {
            switch (kriteria_calon_fisik.warna_kulit) {
                case 'coklat_sawo_matang':
                    return skin_color.sawo_matang;
                case 'putih':
                    return skin_color.putih;
                case 'putih_kemerahan':
                    return skin_color.putih_kemerahan;
                case 'Gelap':
                    return skin_color.gelap;
                case 'Hitam':
                    return skin_color.hitam;
                default:
                    return skin_color.sawo_matang;
            }
        })();

        const hairColor: hair_color = (() => {
            switch (kriteria_calon_fisik.warna_rambut) {
                case 'hitam':
                    return hair_color.hitam;
                case 'pirang':
                    return hair_color.pirang;
                case 'merah':
                    return hair_color.merah;
                case 'putih':
                    return hair_color.putih;
                default:
                    return hair_color.hitam;
            }
        })();

        const hairType: hair_type = (() => {
            switch (kriteria_calon_fisik.tipe_rambut) {
                case 'lurus':
                    return hair_type.lurus;
                case 'ikal':
                    return hair_type.ikal;
                case 'keriting':
                    return hair_type.keriting;
                case 'kribo':
                    return hair_type.kribo;
                case 'botak':
                    return hair_type.botak;
                default:
                    return hair_type.ikal;
            }
        })();

        const eyeColor: eye_Color = (() => {
            switch (kriteria_calon_fisik.warna_mata) {
                case 'hitam':
                    return eye_Color.hitam;
                case 'coklat':
                    return eye_Color.coklat;
                case 'biru':
                    return eye_Color.biru;
                case 'hijau':
                    return eye_Color.hijau;
                default:
                    return eye_Color.hitam;
            }
        })();

        let height: number =
            kriteria_calon_fisik.tinggi_badan == '-'
                ? 0
                : get_lowest_number_from_string(kriteria_calon_fisik.tinggi);
        let weight: number =
            kriteria_calon_fisik.berat_badan == '-'
                ? 0
                : get_lowest_number_from_string(kriteria_calon_fisik.berat);

        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: user_id,
            },
        });

        if (!backup_detail && isTest) {
            // create dummy user for test

            const user = await create_dummy_user_biodata(user_id, new_db);

            backup_detail = user.backup_detail;
        }
        if (backup_detail != null) {
            const biodata = await new_db.biodata.findFirst({
                where: {
                    userId: backup_detail.userId,
                },
            });
            if (biodata) {
                const biodataId = biodata.id;
                const new_physical_criteria: Prisma.PhysicalCriteriaCreateInput =
                    {
                        biodata: { connect: { id: biodataId } },
                        height: height,
                        weight: weight,
                        body_shape: bodyShape,
                        skin_color: skinColor,
                        hair_color: hairColor,
                        hair_type: hairType,
                        eye_color: eyeColor,
                    };
                await new_db.physicalCriteria.upsert({
                    where: { biodataId: biodataId },
                    create: new_physical_criteria,
                    update: new_physical_criteria,
                });
                const check_non_physical_character =
                    await new_db.nonPhysicalCharacter.findFirst({
                        where: {
                            biodataId: biodataId,
                        },
                    });

                const data = { sport: kriteria_calon_fisik.olahraga_digemari };
                if (check_non_physical_character) {
                    await new_db.nonPhysicalCharacter.update({
                        where: {
                            biodataId: biodata.id,
                        },
                        data,
                    });
                } else {
                    await new_db.nonPhysicalCharacter.create({
                        data: {
                            ...data,
                            biodata: {
                                connect: { id: biodataId },
                            },
                        },
                    });
                }
            }
        }
    }
    console.log('\nDone migration: Physical character');
}
