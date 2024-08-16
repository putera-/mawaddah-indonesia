import mysql from 'mysql2/promise'
import { Prisma, PrismaClient } from "@prisma/client";
import { create_dummy_user_biodata } from './helper/create_user_biodata';

const parameters = process.argv;


// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

/*
migrasi table gazwah.persiapan_pernikahan > rq.marriage_preparations
*/

export async function persiapan_pernikahan(old_db: mysql.Connection, new_db: PrismaClient) {
    const [preparations]: any[] = await old_db.execute("SELECT * FROM persiapan_pernikahan");

    for (let i = 0; i < preparations.length; i++) {
        const preparation = preparations[i];
        const old_user_id = preparation.user_id;
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

            if (!biodata) continue;

            let visi = ''
            if (preparation.persiapan == 'Visi Pernikahan?' || 'Visi dan misi pernikahan') {
                visi = preparation.keterangan
            }

            let misi = ''
            if (preparation.persiapan == 'Misi Pernikahan?' || 'Visi dan misi pernikahan') {
                misi = preparation.keterangan
            }

            let mental = ''
            if (preparation.persiapan == 'Persiapan Mental?' || 'Perisapan fisik dan mental') {
                mental = preparation.keterangan
            }

            let mahar = ''
            if (preparation.persiapan == 'Mahar Pernikahan?' || 'Persiapan Finansial') {
                mahar = preparation.keterangan
            }

            let cost = ''
            if (preparation.persiapan == 'Biaya Pernikahan?' || 'Persiapan Finansial') {
                cost = preparation.keterangan
            }

            let span_time = ''
            if (preparation.persiapan == 'Jangka waktu menikah?' || 'Jangka waktu yang dibutuhkan sebelum menikah') {
                span_time = preparation.keterangan
            }

            const new_marriage_goals: Prisma.MarriagePreparationCreateInput = {
                visi,
                misi,
                mental,
                mahar,
                cost,
                span_time,
                biodata: { connect: { id: biodata.id } }
            }
            await new_db.marriagePreparation.upsert({
                where: { biodataId: biodata.id },
                update: new_marriage_goals,
                create: new_marriage_goals
            })

            console.log(new_marriage_goals)

        }
    }
}
