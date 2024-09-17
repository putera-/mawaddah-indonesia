import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';
import { ExperienceType, Prisma, PrismaClient } from '@prisma/client';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

let count = 0;

export async function pengalaman(
    old_db: mysql.Connection,
    new_db: PrismaClient,
) {
    const [pengalamans]: any[] = await old_db.execute(
        'SELECT * FROM pengalaman',
    );

    for (const pengalaman of pengalamans) {
        if (isTest) {
            if (count >= 100) {
                process.stdout.write('STOP AT 100 DATA: PENGALAMAN');
                break;
            }
            count++;
        }
        process.stdout.write('.');

        const type: ExperienceType = (() => {
            switch (pengalaman.pengalaman_di) {
                case 'Kerja':
                    return ExperienceType.Kerja;
                case  'Pengalaman Pekerjaan':
                    return ExperienceType.Kerja;
                case 'organisasi':
                    return ExperienceType.Organisasi;
                case 'Pengalaman Organisasi':
                    return ExperienceType.Organisasi;
                case 'Pengalaman Kepanitiaan':
                    return ExperienceType.Organisasi;
                default:
                    return ExperienceType.Organisasi;
            }
        })();

        const start_year: number = +pengalaman.tahun;
        const end_year: number = +pengalaman.tahun_to;
        const position: string = pengalaman.posisi;
        const description: string = pengalaman.tentang;

        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: pengalaman.user_id,
            },
        });

        if (backup_detail == null && isTest) {
            //create data dummy
            const user = await create_dummy_user_biodata(
                pengalaman.user_id,
                new_db,
            );
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
                const new_experience: Prisma.ExperienceCreateInput = {
                    biodata: { connect: { id: biodataId } },
                    type,
                    start_year,
                    end_year,
                    position,
                    description,
                };

                await new_db.experience.create({
                    data: new_experience,
                });
            }
        }
    }

    console.log('\nDone migration: Experience');
}
