import { faker } from '@faker-js/faker';
import { body_shape, Prisma, PrismaClient, RoleStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

export async function physical_character(
    old_db: mysql.Connection,
    new_db: PrismaClient,
) {
    // const [old_users]: any[] = await old_db.execute('SELECT * FROM users');

    const users = await new_db.user.findMany();
    const [gambaran_fisiks]: any[] = await old_db.execute(
        'SELECT * FROM gambaran_fisik',
    );

    for (const gambaran_fisik of gambaran_fisiks) {
        const user_id = gambaran_fisik.user_id;
        const password = await bcrypt.hash('rahasia', 10);

        let user: Prisma.UserCreateInput = users.find(
            (u: any) => u.old_id == user_id,
        );

        if (!user && isTest) {
            // create dummy user for test
            const firstname = faker.person.firstName();
            user = {
                old_id: user_id,
                email: faker.internet
                    .email({ firstName: firstname })
                    .toLowerCase(),
                firstname,
                lastname: faker.person.lastName(),
                active: true,
                verified: true,
                role: RoleStatus.MEMBER,
                // password: {
                //     create: {
                //         password,
                //     },
                // },
            };

            await new_db.user.create({ data: user });
        }
        // process.stdout.write('.');
        // for (const u_id of old_physical_character.user_id) {
        //     const user = await old_db.execute(
        //         `SELECT * FROM users WHERE id = ${u_id}`,
        //     );
        // }

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
    }

    // for (const old_user of old_users) {
    //     const new_user: Prisma.UserCreateInput = {
    //         email: old_user.email,
    //         firstname: old_user.first_name,
    //         lastname: old_user.last_name,
    //         active: old_user.active ? true : false,
    //         password: {
    //             create: {
    //                 password: old_user.encrypted_password,
    //             },
    //         },
    //         biodata: {
    //             create: {
    //                 bio: '-', // FIXME
    //                 phone: old_user.phone,
    //                 // manhaj,
    //                 dob: old_user.birthday,
    //                 // gender,
    //                 // marriage_status,
    //                 // marriage_permission,
    //                 birth_place: old_user.birth_of_place,
    //                 birth_order: old_user.child_for,
    //                 ethnic: old_user.suku,
    //                 address: old_user.address_now,
    //                 address_town: old_user.address_now,
    //                 address_province: old_user.provinsi,
    //                 hometown_province: old_user.address_origin,
    //                 address_zip_code: 0, // FIXME
    //                 poligami_opinion: '', // FIXME
    //             },
    //         },
    //     };
    //     await new_db.user.create({
    //         data: new_user,
    //     });
    // }
}
