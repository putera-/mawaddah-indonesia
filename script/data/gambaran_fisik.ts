// import { faker, fakerMK } from '@faker-js/faker';
import {
    body_shape,
    eye_Color,
    hair_color,
    hair_type,
    // Gender,
    // ManhajStatus,
    // MarriagePermission,
    // MarriageStatus,
    Prisma,
    PrismaClient,
    skin_color,
    // RoleStatus,
} from '@prisma/client';
import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';
import { fa } from '@faker-js/faker';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

export async function physical_character(
    old_db: mysql.Connection,
    new_db: PrismaClient,
) {
    // const users = await new_db.user.findMany();
    const [gambaran_fisiks]: any[] = await old_db.execute(
        'SELECT * FROM gambaran_fisik',
    );

    for (const gambaran_fisik of gambaran_fisiks) {
        const user_id = gambaran_fisik.user_id;

        const bodyShape: body_shape = (() => {
            switch (gambaran_fisik.bentuk_fisik) {
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
            switch (gambaran_fisik.warna_kulit) {
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
            switch (gambaran_fisik.warna_rambut) {
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
            switch (gambaran_fisik.tipe_rambut) {
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
            switch (gambaran_fisik.warna_mata) {
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

        const characteristic = (() => {
            switch (gambaran_fisik.cacat_fisik) {
                case 0:
                    return false;
                case 1:
                    return true;
                default:
                    return false;
            }
        })();
        let characteristic_detail: string;
        if (characteristic == true) {
            characteristic_detail = gambaran_fisik.cacat_fisik_desc;
        } else {
            characteristic_detail = '';
        }

        let height: number =
            gambaran_fisik.tinggi_badan == '-'
                ? 0
                : Math.max(
                      gambaran_fisik.tinggi_badan.match(/\d+/g).map(Number),
                  );
        let weight: number =
            gambaran_fisik.berat_badan == '-'
                ? 0
                : Math.max(
                      gambaran_fisik.berat_badan.match(/\d+/g).map(Number),
                  );
        // console.log(user_id, height, weight);
        const medical_history = (() => {
            switch (gambaran_fisik.riwayat_penyakit) {
                case 0:
                    return false;
                case 1:
                    return true;
                default:
                    return false;
            }
        })();
        let medical_history_detail: string;
        if (medical_history == true) {
            medical_history_detail = gambaran_fisik.riwayat_penyakit_desc;
        } else {
            medical_history_detail = '';
        }

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
                const new_physical_character: Prisma.PhysicalCharacterCreateInput =
                    {
                        biodata: { connect: { id: biodataId } },
                        height: isNaN(height) ? 0 : height,
                        weight: isNaN(weight) ? 0 : weight,
                        body_shape: bodyShape,
                        skin_color: skinColor,
                        hair_color: hairColor,
                        hair_type: hairType,
                        eye_color: eyeColor,
                        characteristic,
                        characteristic_detail,
                        medical_history,
                        medical_history_detail,
                    };
                await new_db.physicalCharacter.upsert({
                    where: { biodataId: biodataId },
                    create: new_physical_character,
                    update: new_physical_character,
                });
                const check_non_physical_character =
                    await new_db.nonPhysicalCharacter.findFirst({
                        where: {
                            biodataId: biodataId,
                        },
                    });

                const data = { sport: gambaran_fisik.olahraga_digemari };
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
    console.log('Done migration: Physical character');
}
