import { Prisma, PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

let count = 0;

export async function gambaran_diri(
    old_db: mysql.Connection,
    new_db: PrismaClient,
) {
    const [gambaran_diris]: any[] = await old_db.execute(
        'SELECT * FROM gambaran_diri',
    );

    for (const gambaran_diri of gambaran_diris) {
        if (isTest) {
            if (count >= 100) {
                process.stdout.write('STOP AT 100 DATA: GAMBARAN DIRI');
                break;
            }
            count++;
        }

        process.stdout.write('.');

        const user_id = gambaran_diri.user_id;

        let motto: string = gambaran_diri.moto;
        let life_goal: string = gambaran_diri.target_hidup;
        let hobby: string = gambaran_diri.hobi;
        let spare_time_activity: string = gambaran_diri.kegiatan_waktu_luang;
        let positive_traits: string = gambaran_diri.sifat_positif;
        let negative_traits: string = gambaran_diri.sifat_negatif;
        let liked_things: string = gambaran_diri.hal_disukai;
        let unliked_things: string = '';
        let alcohol_smoking = (() => {
            switch (gambaran_diri.merokok) {
                case 0:
                    return false;
                case 1:
                    return true;
                default:
                    return false;
            }
        })();
        let drink_alcohol: boolean = alcohol_smoking;
        let smoking: boolean = alcohol_smoking;
        let sport: string = '';

        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: user_id,
            },
        });

        if (backup_detail == null && isTest) {
            //create data dummy
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
                const new_non_physical_character: Prisma.NonPhysicalCharacterCreateInput =
                {
                    biodata: {
                        connect: {
                            id: biodataId,
                        },
                    },
                    motto,
                    life_goal,
                    hobby,
                    spare_time_activity,
                    positive_traits,
                    negative_traits,
                    liked_things,
                    unliked_things,
                    drink_alcohol,
                    smoking,
                    sport,
                };
                await new_db.nonPhysicalCharacter.upsert({
                    where: { biodataId: biodataId },
                    create: new_non_physical_character,
                    update: new_non_physical_character,
                });
            }
        }
    }

    console.log('Done migration: Non physical character');
}
