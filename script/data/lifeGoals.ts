import { LifeGoal, Prisma, PrismaClient } from "@prisma/client";
import mysql from 'mysql2/promise'
import { create_dummy_user_biodata } from "./helper/create_user_biodata";

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

/*
migrasi table gazwah.harapan > rq.;ifeGoals
*/
export async function harapan(old_db: mysql.Connection, new_db: PrismaClient) {
    const [lifeGoals]: any[] = await old_db.execute("SELECT * FROM harapan");

    for (let i = 0; i < lifeGoals.length; i++) {
        const goal = lifeGoals[i];
        const old_user_id = goal.user_id;
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

            //TODO bikin schema 'Sumber dana acara pernikahan'

            //  if (goal.tag == 'Sumber dana acara pernikahan') {
            //     return dataLifeGoals.career
            // }
            let child_count = ''
            if (goal.tag == 'Keturunan dan pendidikan anak') {
                child_count = goal.keterangan
            }

            let career = ''
            if (goal.tag == 'Karier ke depan' || goal.tag == 'Rencana Karier ke depan?') {
                career = goal.keterangan
            }

            let domicile = ''
            if (goal.tag == 'Domisili ke depan?' || goal.tag == 'Domisili') {
                domicile = goal.keterangan
            }

            let child_education = ''
            if (goal.tag == 'Pendidikan Anak?' || goal.tag == 'Keturunan dan pendidikan anak') {
                child_education = goal.keterangan
            }

            let financial_arrangement = ''
            if (goal.tag == 'Pengelolaan keuangan rumah tangga' || goal.tag == 'Keuangan Rumah Tangga?') {
                financial_arrangement = goal.keterangan
            }

            let knowledge_upgrade = ''
            if (goal.tag == 'Peningkatan ilmu agama' || goal.tag == 'Peningkatan ilmu agama?') {
                knowledge_upgrade = goal.keterangan
            }

            let short_term_achievement = ''
            if (goal.tag == 'Target Jangka Pendek') {
                short_term_achievement = goal.keterangan
            }

            let long_term_achievement = ''
            if (goal.tag == 'Target jangka panjang') {
                long_term_achievement = goal.keterangan
            }

            let wife_work_permit_desc = ''
            if (goal.tag == 'Istri Boleh bekerja?' || goal.tag == 'Memperbolehkan istri untuk bekerja') {
                wife_work_permit_desc = goal.keterangan
            }

            const dataLifeGoals = {
                career,
                domicile,
                child_count,
                child_education,
                financial_arrangement,
                knowledge_upgrade,
                short_term_achievement,
                long_term_achievement,
                wife_work_permit_desc,
            }


            const new_life_goals: Prisma.LifeGoalCreateInput = {
                ...dataLifeGoals,
                biodata: { connect: { id: biodata.id } }
            }

            await new_db.lifeGoal.create({ data: new_life_goals })

            console.log(new_life_goals)


        }
    }
}
