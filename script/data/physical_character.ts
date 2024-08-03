import { faker, fakerMK } from '@faker-js/faker';
import {
    body_shape,
    // Gender,
    // ManhajStatus,
    // MarriagePermission,
    // MarriageStatus,
    Prisma,
    PrismaClient,
    // RoleStatus,
} from '@prisma/client';
// import * as bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { create_dummy_user_biodata } from './helper/create_user_biodata';

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

    // const manhaj: ManhajStatus[] = [
    //     ManhajStatus.BARU_BELAJAR,
    //     ManhajStatus.NON_SALAF,
    //     ManhajStatus.SALAF,
    // ];

    // // const dummy_gender: Gender[] = ['PRIA', 'WANITA'];

    // function getRandomDate(startYear = 1970, endYear = 2005) {
    //     // Tanggal awal: 1 Januari 1970
    //     const start = new Date(`${startYear}-01-01T00:00:00.000Z`).getTime();
    //     // Tanggal akhir: 1 Januari 2005
    //     const end = new Date(`${endYear}-01-01T00:00:00.000Z`).getTime();

    //     // Milidetik acak antara start dan end
    //     const randomTime =
    //         Math.floor(Math.random() * (end - start + 1)) + start;

    //     // Buat objek Date dari milidetik acak
    //     const randomDate = new Date(randomTime);

    //     // Kembalikan tanggal dalam format ISO 8601
    //     return randomDate.toISOString();
    // }

    // const marriage_status: MarriageStatus[] = [
    //     MarriageStatus.CERAI_HIDUP,
    //     MarriageStatus.CERAI_MATI,
    //     MarriageStatus.LAJANG,
    //     MarriageStatus.MENIKAH,
    // ];

    // const marriage_permissions: MarriagePermission[] = [
    //     MarriagePermission.NON_POLIGAMI,
    //     MarriagePermission.POLIGAMI,
    // ];

    // const provinces = await new_db.province.findMany();
    // const randomProvinceIndex = Math.floor(Math.random() * provinces.length);
    // const randomProvinceIndex1 = Math.floor(Math.random() * provinces.length);
    // const randomProvinceIndex2 = Math.floor(Math.random() * provinces.length);

    // const sukuIndonesia = [
    //     'Aceh',
    //     'Batak',
    //     'Minangkabau',
    //     'Melayu',
    //     'Sunda',
    //     'Jawa',
    //     'Madura',
    //     'Betawi',
    //     'Bali',
    //     'Sasak',
    //     'Bugis',
    //     'Makassar',
    //     'Toraja',
    //     'Dayak',
    //     'Banjar',
    //     'Papua',
    //     'Ambon',
    //     'Flores',
    //     'Timor',
    //     'Sumbawa',
    //     'Nias',
    //     'Asmat',
    //     'Mentawai',
    //     'Tolaki',
    //     'Minahasa',
    //     'Sangir',
    //     'Bajau',
    //     'Torres Strait Islander',
    // ];

    // const poligamiOpinions = [
    //     'Saya sangat suka dengan poligami',
    //     'Yang pasti hukum Islam tidak melarang poligami secara mutlak (haram) dan juga tidak menganjurkan secara mutlak (wajib).',
    //     'Menurutku poligami itu sah-sah aja asal tujuan dan caranya baik-baik',
    //     'Saya kurang suka dengan poligami',
    //     'Saya tidak suka dengan poligami',
    //     'Poligami itu tanda tidak setia dan tidak cinta',
    // ];

    const users = await new_db.user.findMany();
    const [gambaran_fisiks]: any[] = await old_db.execute(
        'SELECT * FROM gambaran_fisik',
    );

    const manhaj: ManhajStatus[] = [
        ManhajStatus.BARU_BELAJAR,
        ManhajStatus.NON_SALAF,
        ManhajStatus.SALAF,
    ];

    // const dummy_gender: Gender[] = ['PRIA', 'WANITA'];

    function getRandomDate(startYear = 1970, endYear = 2005) {
        // Tanggal awal: 1 Januari 1970
        const start = new Date(`${startYear}-01-01T00:00:00.000Z`).getTime();
        // Tanggal akhir: 1 Januari 2005
        const end = new Date(`${endYear}-01-01T00:00:00.000Z`).getTime();

        // Milidetik acak antara start dan end
        const randomTime =
            Math.floor(Math.random() * (end - start + 1)) + start;

        // Buat objek Date dari milidetik acak
        const randomDate = new Date(randomTime);

        // Kembalikan tanggal dalam format ISO 8601
        return randomDate.toISOString();
    }

    const marriage_status: MarriageStatus[] = [
        MarriageStatus.CERAI_HIDUP,
        MarriageStatus.CERAI_MATI,
        MarriageStatus.LAJANG,
        MarriageStatus.MENIKAH,
    ];

    const marriage_permissions: MarriagePermission[] = [
        MarriagePermission.NON_POLIGAMI,
        MarriagePermission.POLIGAMI,
    ];

    const provinces = await new_db.province.findMany();
    const randomProvinceIndex = Math.floor(Math.random() * provinces.length);
    const randomProvinceIndex1 = Math.floor(Math.random() * provinces.length);
    const randomProvinceIndex2 = Math.floor(Math.random() * provinces.length);

    const sukuIndonesia = [
        'Aceh',
        'Batak',
        'Minangkabau',
        'Melayu',
        'Sunda',
        'Jawa',
        'Madura',
        'Betawi',
        'Bali',
        'Sasak',
        'Bugis',
        'Makassar',
        'Toraja',
        'Dayak',
        'Banjar',
        'Papua',
        'Ambon',
        'Flores',
        'Timor',
        'Sumbawa',
        'Nias',
        'Asmat',
        'Mentawai',
        'Tolaki',
        'Minahasa',
        'Sangir',
        'Bajau',
        'Torres Strait Islander',
    ];

    const poligamiOpinions = [
        'Saya sangat suka dengan poligami',
        'Yang pasti hukum Islam tidak melarang poligami secara mutlak (haram) dan juga tidak menganjurkan secara mutlak (wajib).',
        'Menurutku poligami itu sah-sah aja asal tujuan dan caranya baik-baik',
        'Saya kurang suka dengan poligami',
        'Saya tidak suka dengan poligami',
        'Poligami itu tanda tidak setia dan tidak cinta',
    ];

    for (const gambaran_fisik of gambaran_fisiks) {
        const user_id = gambaran_fisik.user_id;
        // const password = await bcrypt.hash('rahasia', 10);

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

        const characteristic = (() => {
            switch (gambaran_fisik.cacat_fisik) {
                case 0:
                    return false;
                case 1:
                    return true;
                default:
                    return false;
            }
        })();
        let characteristic_detail: string;
        if (characteristic == true) {
            characteristic_detail = gambaran_fisik.cacat_fisik_desc;
        } else {
            characteristic_detail = '';
        }

        const medical_history = (() => {
            switch (gambaran_fisik.riwayat_penyakit) {
                case 0:
                    return false;
                case 1:
                    return true;
                default:
                    return false;
            }
        })();
        let medical_history_detail: string;
        if (medical_history == true) {
            medical_history_detail = gambaran_fisik.riwayat_penyakit_desc;
        } else {
            medical_history_detail = '';
        }

        // let user: Prisma.UserCreateInput = users.find(
        //     (u: any) => u.old_id == user_id,
        // );

        let backup_detail = await new_db.backupDetail.findFirst({
            where: {
                old_id: user_id,
            },
        });

        if (!backup_detail && isTest) {
            // create dummy user for test

            const user = await create_dummy_user_biodata(user_id, new_db);

            backup_detail = user.backup_detail;
            // const firstname = faker.person.firstName('male');
            // user = {
            //     old_id: user_id,
            //     email: faker.internet
            //         .email({ firstName: firstname })
            //         .toLowerCase(),
            //     firstname,
            //     lastname: faker.person.lastName('male'),
            //     active: true,
            //     verified: true,
            //     role: RoleStatus.MEMBER,
            //     biodata: {
            //         create: {
            //             bio: faker.person.bio(),
            //             phone: '081234567890',
            //             manhaj: manhaj[
            //                 Math.floor(Math.random() * manhaj.length)
            //             ],
            //             dob: getRandomDate(),
            //             gender: 'PRIA',
            //             marriage_status:
            //                 marriage_status[
            //                     Math.floor(
            //                         Math.random() * marriage_status.length,
            //                     )
            //                 ],
            //             marriage_permission:
            //                 marriage_permissions[
            //                     Math.floor(
            //                         Math.random() * marriage_permissions.length,
            //                     )
            //                 ],
            //             birth_place: provinces[randomProvinceIndex].name,
            //             birth_order: 1,
            //             ethnic: sukuIndonesia[
            //                 Math.floor(Math.random() * sukuIndonesia.length)
            //             ],
            //             address: faker.location.streetAddress(true),
            //             address_town: provinces[randomProvinceIndex1].name,
            //             address_province: provinces[randomProvinceIndex].name,
            //             hometown_province: provinces[randomProvinceIndex2].name,
            //             address_zip_code: Math.floor(Math.random() * 100),
            //             poligami_opinion:
            //                 poligamiOpinions[
            //                     Math.floor(
            //                         Math.random() * poligamiOpinions.length,
            //                     )
            //                 ],
            //             physical_characters: {
            //                 create: {
            //                     height: gambaran_fisik.tinggi_badan,
            //                     weight: gambaran_fisik.berat_badan,
            //                     body_shape: bodyShape,
            //                     skin_color: gambaran_fisik.warna_kulit,
            //                     hair_color: gambaran_fisik.warna_rambut,
            //                     hair_type: gambaran_fisik.tipe_rambut,
            //                     eye_color: gambaran_fisik.warna_mata,
            //                     characteristic,
            //                     characteristic_detail,
            //                     medical_history,
            //                     medical_history_detail,
            //                 },
            //             },
            //         },
            //     },
            //     // password: {
            //     //     create: {
            //     //         password,
            //     //     },
            //     // },
            // };

            // await new_db.user.create({ data: user });
        }

        if (backup_detail != null) {
            const biodata = await new_db.biodata.findFirst({
                where: {
                    userId: backup_detail.userId,
                },
            });
            if (biodata) {
                const new_physical_character: Prisma.PhysicalCharacterCreateInput =
                    {
                        biodata: { connect: { id: biodata.id } },
                        height: gambaran_fisik.tinggi_badan,
                        weight: gambaran_fisik.berat_badan,
                        body_shape: bodyShape,
                        skin_color: gambaran_fisik.warna_kulit,
                        hair_color: gambaran_fisik.warna_rambut,
                        hair_type: gambaran_fisik.tipe_rambut,
                        eye_color: gambaran_fisik.warna_mata,
                        characteristic,
                        characteristic_detail,
                        medical_history,
                        medical_history_detail,
                    };
                await new_db.physicalCharacter.create({
                    data: new_physical_character,
                });
            }
        }

        // process.stdout.write('.');
        // for (const u_id of old_physical_character.user_id) {
        //     const user = await old_db.execute(
        //         `SELECT * FROM users WHERE id = ${u_id}`,
        //     );
        // }
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
