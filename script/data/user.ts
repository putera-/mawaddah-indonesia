import {
    body_shape,
    Gender,
    ManhajStatus,
    MarriagePermission,
    MarriageStatus,
    Prisma,
    PrismaClient,
} from '@prisma/client';
import mysql from 'mysql2/promise';
import { get_user_by_old_id } from './helper/get_user_by_old_id';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

let count = 0;

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

export async function user(old_db: mysql.Connection, new_db: PrismaClient) {
    const [old_users]: any[] = await old_db.execute('SELECT * FROM users');

    for (const old_user of old_users) {

        // IN TEST MODE, STOP AT 100 DATA
        if (isTest) {
            if (count >= 100) {
                process.stdout.write('STOP AT 100 DATA: USERS');
                break;
            }
            count++;
        }

        process.stdout.write('.');

        const user = await get_user_by_old_id(old_user.id, new_db);

        // Skip if already created
        if (user) {
            continue;
        }

        const marriage_status: MarriageStatus = (() => {
            switch (old_user.merried) {
                case 0:
                    return MarriageStatus.LAJANG;
                    break;
                case 1:
                    return MarriageStatus.MENIKAH;
                    break;
                case 2:
                    return MarriageStatus.CERAI_HIDUP;
                    break;
                case 3:
                    return MarriageStatus.CERAI_MATI;
                    break;
                default:
                    return MarriageStatus.LAJANG;
            }
        })();

        const marriage_permission: MarriagePermission = (() => {
            switch (old_user.wedding_blessing) {
                case 1:
                    return MarriagePermission.NON_POLIGAMI;
                    break;
                case 2:
                    return MarriagePermission.POLIGAMI;
                    break;
                default:
                    return MarriagePermission.NON_POLIGAMI;
            }
        })();

        const manhaj: ManhajStatus = (() => {
            switch (old_user.manhaj) {
                case 'SALAF':
                    return ManhajStatus.SALAF;
                    break;
                case 'UNSALAF':
                    return ManhajStatus.BARU_BELAJAR;
                    break;
                case 'NOSALAF':
                    return ManhajStatus.NON_SALAF;
                    break;
                default:
                    return ManhajStatus.SALAF;
            }
        })();

        const gender: Gender = (() => {
            switch (old_user.gender) {
                case 0:
                    return Gender.PRIA;
                    break;
                case 1:
                    return Gender.WANITA;
                    break;
                default:
                    return Gender.PRIA;
            }
        })();

        const new_user: Prisma.UserCreateInput = {
            old_id: old_user.id,
            email: old_user.email,
            firstname: old_user.first_name,
            lastname: old_user.last_name,
            active: old_user.active ? true : false,
            password: {
                create: {
                    password: old_user.encrypted_password,
                },
            },
            biodata: {
                create: {
                    bio: '-', // FIXME
                    phone: old_user.phone,
                    manhaj,
                    dob: old_user.birthday,
                    gender,
                    marriage_status,
                    marriage_permission,
                    birth_place: old_user.birth_of_place,
                    birth_order: old_user.child_for,
                    ethnic: old_user.suku,
                    address: old_user.address_now,
                    address_town: old_user.address_now,
                    address_province: old_user.provinsi,
                    hometown_province: old_user.address_origin,
                    address_zip_code: 0, // FIXME
                    poligami_opinion: '', // FIXME
                },
            },
            backup_detail: {
                create: {
                    old_id: old_user.id,
                },
            },
        };

        await new_db.user.create({ data: new_user });
    }

    console.log('\nDone migration: Users')
}
