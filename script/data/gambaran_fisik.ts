// import { faker, fakerMK } from '@faker-js/faker';
import {
    body_shape,
    // Gender,
    // ManhajStatus,
    // MarriagePermission,
    // MarriageStatus,
    Prisma,
    PrismaClient,
    // RoleStatus,
} from '@prisma/client';
import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';

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
                const new_physical_character: Prisma.PhysicalCharacterCreateInput =
                    {
                        biodata: { connect: { id: biodata.id } },
                        height: gambaran_fisik.tinggi_badan,
                        weight: gambaran_fisik.berat_badan,
                        body_shape: bodyShape,
                        skin_color: gambaran_fisik.warna_kulit,
                        hair_color: gambaran_fisik.warna_rambut,
                        hair_type: gambaran_fisik.tipe_rambut,
                        eye_color: gambaran_fisik.warna_mata,
                        characteristic,
                        characteristic_detail,
                        medical_history,
                        medical_history_detail,
                    };
                await new_db.physicalCharacter.create({
                    data: new_physical_character,
                });
                await new_db.nonPhysicalCharacter.update({
                    where: {
                        biodataId: biodata.id,
                    },
                    data: {
                        sport: gambaran_fisik.olahraga_digemari,
                    },
                });
            }
        }
    }
}
