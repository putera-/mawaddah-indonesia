import { Prisma, PrismaClient, relationship, religion } from '@prisma/client';
import dayjs from 'dayjs';
import mysql from 'mysql2/promise'
import { create_dummy_user_biodata } from './helper/create_user_biodata';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

/*
migrasi table gazwah.gambaran_keluarga > rq.family_member
*/
export async function gambaran_keluarga(old_db: mysql.Connection, new_db: PrismaClient) {
    const [families]: any[] = await old_db.execute("SELECT * FROM gambaran_keluarga");

    for (let i = 0; i < families.length; i++) {

        // IN TEST MODE, STOP AT 100 DATA
        if (isTest) {
            if (i >= 100) {
                process.stdout.write('STOP AT 100 DATA: GAMBARAN KELUARGA');
                break;
            }
        }

        const family = families[i];
        const old_user_id = family.user_id;
        process.stdout.write('.');

        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: old_user_id
            }
        })

        if (backup_detail == null && isTest) {
            //create data dummy
            const user = await create_dummy_user_biodata(old_user_id, new_db, i);

            backup_detail = user.backup_detail;
        }

        if (backup_detail != null) {
            const biodata = await new_db.biodata.findFirst({
                where: {
                    userId: backup_detail.userId
                }
            })


            const relationships: relationship = (() => {
                switch (family.posisi) {
                    case "Ayah":
                        return relationship.ayah
                        break;
                    case "Ibu":
                        return relationship.ibu
                        break;
                    case "Kakak Laki":
                        return relationship.kakak_pria
                        break;
                    case "Kakak Perempuan":
                        return relationship.kakak_wanita
                        break;
                    case "Adik Laki":
                        return relationship.adik_pria
                        break;
                    case "Adik Perempuan":
                        return relationship.adik_wanita
                        break;
                    case "Anak Laki":
                        return relationship.anak_kandung
                        break;
                    case "Anak Perempuan":
                        return relationship.anak_kandung
                        break;
                    //TODO sementara pakai default untuk data diluar enum
                    default:
                        return relationship.none
                }
            })();

            const religions: religion = (() => {
                switch (family.agama) {
                    case "IslamSalaf":
                        return religion.islam
                        break;
                    case "Islam":
                        return religion.islam
                        break;
                    case "BukanIslam":
                        return religion.non_islam
                        break;
                }
            })();

            const is_alive: boolean = (() => {
                switch (family.masih_hidup) {
                    case 1:
                        return true
                        break;
                    case 0:
                        return false
                        break;
                }
            })();

            const dob = dayjs().subtract(family.usia, 'year').format('YYYY-MM-DD');
            const new_famMembers: Prisma.FamilyMemberCreateInput = {
                relationship: relationships,
                religion: religions,
                dob,
                education: family.pekerjaan,
                is_alive,
                job: family.pekerjaan,
                biodata: {
                    connect: {
                        id: biodata.id
                    }
                }
            };

            await new_db.familyMember.create({ data: new_famMembers });
        }
    }

    console.log('\nDone migration: Family Members')
}
