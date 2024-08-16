import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';
import { PrismaClient } from '@prisma/client';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

let count = 0;

export async function non_physical_criteria(
    old_db: mysql.Connection,
    new_db: PrismaClient,
) {
    const [kriteria_calon_non_fisiks]: any[] = await old_db.execute(
        'SELECT * FROM kriteria_calon_non_fisik',
    );

    for (let i = 0; i < kriteria_calon_non_fisiks.length; i++) {
        // IN TEST MODE, STOP AT 100 DATA
        if (isTest) {
            if (i >= 100) {
                process.stdout.write(
                    'STOP AT 100 DATA: KRITERIA CALON NON FISIK',
                );
                break;
            }
        }
        process.stdout.write('.');
        const kriteria_calon_non_fisik = kriteria_calon_non_fisiks[i];
        const old_user_id = kriteria_calon_non_fisik.user_id;

        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: old_user_id,
            },
        });

        if (backup_detail == null && isTest) {
            //create data dummy
            const user = await create_dummy_user_biodata(
                old_user_id,
                new_db,
                i,
            );

            backup_detail = user.backup_detail;
        }

        if (backup_detail != null) {
            const biodata = await new_db.biodata.findFirst({
                where: {
                    userId: backup_detail.userId,
                },
            });
        }
        // const element = kriteria_calon_non_fisiks[i];
    }

    console.log('Non-physical criteria data migrated successfully.');
    // process.exit(0);
}
