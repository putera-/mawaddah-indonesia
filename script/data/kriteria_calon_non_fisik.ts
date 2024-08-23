import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';
import { MarriageStatus, Prisma, PrismaClient } from '@prisma/client';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

let count = 0;

export async function kriteria_calon_non_fisik(
    old_db: mysql.Connection,
    new_db: PrismaClient,
) {
    const [kriteria_calon_non_fisiks]: any[] = await old_db.execute(
        'SELECT * FROM kriteria_calon_non_fisik',
    );

    for (let i = 0; i < kriteria_calon_non_fisiks.length; i++) {
        // IN TEST MODE, STOP AT 100 DATA
        if (isTest) {
            if (count >= 100) {
                process.stdout.write(
                    'STOP AT 100 DATA: KRITERIA CALON NON FISIK',
                );
                break;
            }
            count++;
        }
        process.stdout.write('.');

        const kriteria_calon_non_fisik = kriteria_calon_non_fisiks[i];
        const old_user_id = kriteria_calon_non_fisik.user_id;

        const married_status: MarriageStatus = (() => {
            switch (kriteria_calon_non_fisik.status_pernikahan) {
                case 0:
                    return MarriageStatus.LAJANG;
                case 1:
                    return MarriageStatus.MENIKAH;
                case 2:
                    return MarriageStatus.CERAI_HIDUP;
                case 3:
                    return MarriageStatus.CERAI_MATI;
            }
        })();

        let age: number = kriteria_calon_non_fisik.usia
            ? 0
            : Math.max(kriteria_calon_non_fisik.usia.match(/\d+/g).map(Number));

        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: old_user_id,
            },
        });

        let sport: string = '';
        let hobby: string = '';

        if (backup_detail == null && isTest) {
            //create data dummy
            const user = await create_dummy_user_biodata(old_user_id, new_db);

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
                const new_non_physical_criteria: Prisma.NonPhysicalCriteriaCreateInput =
                {
                    biodata: { connect: { id: biodataId } },
                    age: isNaN(age) ? 0 : age,
                    domicile: kriteria_calon_non_fisik.domisili,
                    education: kriteria_calon_non_fisik.pendidikan,
                    married_status,
                    sport,
                    hobby,
                    traits: kriteria_calon_non_fisik.sifat,
                    ethnic: kriteria_calon_non_fisik.suku,
                    job: kriteria_calon_non_fisik.pekerjaan,
                    other: kriteria_calon_non_fisik.lain_lain,
                };
                await new_db.nonPhysicalCriteria.upsert({
                    where: { biodataId: biodataId },
                    create: new_non_physical_criteria,
                    update: new_non_physical_criteria,
                });
            }
        }
    }
    console.log('\nDone migration: Non Physical Criteria');
}
