import { Prisma, PrismaClient } from "@prisma/client";
import mysql from 'mysql2/promise'
import { create_dummy_user_biodata } from "./helper/create_user_biodata";

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

/*
migrasi table gazwah.pendidikan > rq.educations
*/
export async function pendidikan(old_db: mysql.Connection, new_db: PrismaClient) {
    const [educations]: any[] = await old_db.execute("SELECT * FROM pendidikan");

    for (let i = 0; i < educations.length; i++) {
        // IN TEST MODE, STOP AT 100 DATA
        if (isTest) {
            if (i >= 100) {
                process.stdout.write('STOP AT 100 DATA: PENDIDIKAN');
                break;
            }
        }

        const education = educations[i];
        const old_user_id = education.user_id;
        process.stdout.write('.');
        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: old_user_id
            }
        })
        if (backup_detail == null && isTest) {
            //create data dummy
            const user = await create_dummy_user_biodata(old_user_id, new_db, i);
            backup_detail = user.backup_detail
        }
        if (backup_detail != null) {
            const biodata = await new_db.biodata.findFirst({
                where: {
                    userId: backup_detail.userId
                }
            })

            let startYear: number = parseInt(education.tahun_pendidikan_from)
            let endYear: number = parseInt(education.tahun_pendidikan_to)

            const new_educations: Prisma.EducationCreateInput = {
                institution_name: '-',
                major: education.jurusan,
                degree: education.jenjang,
                city: '-',
                startYear,
                endYear,
                Biodata: { connect: { id: biodata.id } }
            }

            if (!new_educations.startYear || !new_educations.endYear) continue

            await new_db.education.upsert(
                {
                    where: { biodataId: biodata.id },
                    create: new_educations,
                    update: new_educations,
                }
            )
        }
    }
    console.log('\nDone Migration: Educations')
}
