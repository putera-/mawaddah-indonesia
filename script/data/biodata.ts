import { faker } from '@faker-js/faker';
import {
    Gender,
    ManhajStatus,
    MarriagePermission,
    MarriageStatus,
    Prisma,
    PrismaClient,
} from '@prisma/client';
import mysql from 'mysql2/promise';

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

export async function biodata(old_db: mysql.Connection, new_db: PrismaClient) {
    // const bio: any[] = await old_db.execute('');
    // const manhaj: ManhajStatus[] = [
    //     ManhajStatus.BARU_BELAJAR,
    //     ManhajStatus.NON_SALAF,
    //     ManhajStatus.SALAF,
    // ];

    // const dummyGender: Gender[] = ['PRIA', 'WANITA'];

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

    // const marriedStatus: MarriageStatus[] = [
    //     MarriageStatus.CERAI_HIDUP,
    //     MarriageStatus.CERAI_MATI,
    //     MarriageStatus.LAJANG,
    //     MarriageStatus.MENIKAH,
    // ];

    // const marriagePermissions: MarriagePermission[] = [
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

    const [users]: any[] = await new_db.user.findMany({ include: {biodata : true}});

    if (!users && isTest) {
        console.log('Creating dummy data...');
        // bio: faker.person.bio(),
        // user: old_user,
        // phone: old_user.phone,
        // manhaj: manhaj[Math.floor(Math.random() * manhaj.length)],
        // dob: getRandomDate(),
        // gender: gender[Math.floor(Math.random() * gender.length)],
        // marriage_status:
        //     marriedStatus[Math.floor(Math.random() * marriedStatus.length)],
        // marriage_permission:
        //     marriagePermissions[
        //         Math.floor(Math.random() * marriagePermissions.length)
        //     ],
        // birth_place: provinces[randomProvinceIndex].name,
        // birth_order: 1,
        // ethnic: sukuIndonesia[
        //     Math.floor(Math.random() * sukuIndonesia.length)
        // ],
        // address: faker.location.streetAddress(true),
        // address_town: provinces[randomProvinceIndex1].name,
        // address_province: provinces[randomProvinceIndex].name,
        // hometown_province: provinces[randomProvinceIndex2].name,
        // address_zip_code: Math.floor(Math.random() * 100),
        // poligami_opinion:
        //     poligamiOpinions[
        //         Math.floor(Math.random() * poligamiOpinions.length)
        //     ],
    }

    for (const u of users) {
        
    }
    // for (const old_user of old_users) {
    //     const gender: Gender = (() => {
    //         switch (old_user.gender) {
    //             case 0:
    //                 return Gender.PRIA;
    //                 break;
    //             case 1:
    //                 return Gender.WANITA;
    //                 break;
    //             default:
    //                 return Gender.PRIA;
    //         }
    //     })();

    //     const marriage_status: MarriageStatus = (() => {
    //         switch (old_user.merried) {
    //             case 0:
    //                 return MarriageStatus.LAJANG;
    //                 break;
    //             case 1:
    //                 return MarriageStatus.MENIKAH;
    //                 break;
    //             case 2:
    //                 return MarriageStatus.CERAI_HIDUP;
    //                 break;
    //             case 3:
    //                 return MarriageStatus.CERAI_MATI;
    //                 break;
    //             default:
    //                 return MarriageStatus.LAJANG;
    //         }
    //     })();

    //     const marriage_permission: MarriagePermission = (() => {
    //         switch (old_user.wedding_blessing) {
    //             case 1:
    //                 return MarriagePermission.NON_POLIGAMI;
    //                 break;
    //             case 2:
    //                 return MarriagePermission.POLIGAMI;
    //                 break;
    //             default:
    //                 return MarriagePermission.NON_POLIGAMI;
    //         }
    //     })();

    //     const new_bio: Prisma.BiodataCreateInput = {
    //         bio: faker.person.bio(),
    //         user: { connect: { id: old_user } },
    //         phone: old_user.phone,
    //         manhaj: old_user.manhaj,
    //         dob: old_user.birthday,
    //         gender: gender,
    //         marriage_status,
    //         marriage_permission,
    //         birth_place: old_user.birth_of_place,
    //         birth_order: old_user.child_for,
    //         ethnic: old_user.suku,
    //         address: old_user.address_now,
    //         address_town: old_user.address_now,
    //         address_province: old_user.provinsi,
    //         hometown_province: old_user.address_origin,
    //         address_zip_code: 0, // FIXME
    //         poligami_opinion: '', // FIXME
    //     };

    //     await new_db.biodata.create({ data: new_bio });
    // }
}
