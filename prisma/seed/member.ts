import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function memberSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);
    // BOB
    {
        const bob = {
            lastname: faker.person.lastName('male'),
            password,
            active: true,
            verified: true,
            avatar: '/dummy/abang.png',
            avatar_md: '/dummy/abang.png',
            activations: {
                create: {
                    expiredAt: new Date(),
                    expiredAt: new Date()
                },
            },
        };

        const randoms = [];
        for (let i = 0; i < 100; i++) {
            if (i % 2 == 0) randoms.push(i);
        }

        // create 100 Bob MEMBER
        for (let i = 0; i < 100; i++) {
            const firstname = faker.person.firstName('male');
            const email = faker.internet.email({ firstName: firstname });

            const data: Prisma.UserCreateInput = {
                email,
                firstname,
                ...bob,
            };
            if (randoms.indexOf(i) != -1) {
                // create relasi biodata
                data.biodata = {
                    create: {
                        bio: 'Assalamualaikum, ukhti.',
                        phone: '+628123456789',
                        dob: '2005-01-01T00:00:00.000Z',
                        birth_place: 'Surakarta',
                        birth_order: 1,
                        domicile_town: 'Jagakarsa',
                        domicile_province: 'jakarta',
                        hometown_province: 'jawa tengah',
                        ethnic: 'Jawa',
                        manhaj: 'SALAF',
                        gender: 'PRIA',
                        marriage_status: 'LAJANG',
                        marriage_permission: 'NON_POLIGAMI',
                    },
                };
                data.Skill = {
                    createMany: {
                        data: [
                            {
                                title: 'komunikasi',
                            },
                            {
                                title: 'bela diri',
                            },
                            {
                                title: 'mengelola keuangan',
                            },
                            {
                                title: 'mengendalikan emosi',
                            },
                        ],
                    },
                };
                data.Hobby = {
                    createMany: {
                        data: [
                            { title: 'membaca buku' },
                            { title: 'bermain games' },
                            { title: 'memasak' },
                        ],
                    },
                };
                data.Education = {
                    createMany: {
                        data: [
                            {
                                institution_name: 'Universitas Al-Bashiroh',
                                degree: 'Bachelor',
                                major: 'Japanese Literature',
                                city: 'Jakarta',
                                startYear: 2022,
                            },
                            {
                                institution_name: 'SMA Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2019,
                            },
                            {
                                institution_name: 'SMP Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2016,
                            },
                        ],
                    },
                };
                data.Married_goal = {
                    createMany: {
                        data: [
                            { title: 'rumah tangga islami dan sunnah' },
                            { title: 'membawa keluarga ke surga' },
                            { title: 'memiliki banyak keturunan' },
                            { title: 'menyempurnakan satu sama lain' },
                        ],
                    },
                };
                data.Life_goal = {
                    createMany: {
                        data: [
                            { title: 'bekerja dengan passion yang dimiliki' },
                            {
                                title: 'menjalin hubungan pertemanan yang berkualitas',
                            },
                            { title: 'menjaga kesehatan tubuh' },
                        ],
                    },
                };
                data.Physic_character = {
                    createMany: {
                        data: [
                            {
                                title: 'rambut',
                                description: 'hitam',
                            },
                            {
                                title: 'bentuk wajah',
                                description: 'bulat',
                            },
                            {
                                title: 'mata',
                                description: 'hitam kecoklatan',
                            },
                            {
                                title: 'tinggi',
                                description: '170 cm',
                            },
                            {
                                title: 'berat',
                                description: '70 kg',
                            },
                        ],
                    },
                };
            }
            await prisma.user.upsert({
                where: { email },
                update: data,
                create: data,
            });
        }
    }

    // ALICE
    {
        const alice = {
            lastname: faker.person.lastName('female'),
            password,
            active: true,
            verified: true,
            avatar: '/dummy/nissa.png',
            avatar_md: '/dummy/nissa.png',
            activations: {
                create: {
                    expiredAt: new Date(),
                },
            },
        };
        const randoms = [];
        for (let i = 0; i < 100; i++) {
            if (i % 2 == 1) randoms.push(i);
        }
        // create 100 Alice MEMBER
        for (let i = 0; i < 100; i++) {
            const firstname = faker.person.firstName('female');
            const email = faker.internet.email({ firstName: firstname });
            const data: Prisma.UserCreateInput = {
                email,
                firstname,
                ...alice,
            };
            if (randoms.indexOf(i) != -1) {
                // create relasi biodata
                data.biodata = {
                    create: {
                        bio: 'Assalamualaikum, akhi.',
                        phone: '+628987654321',
                        dob: '2005-01-01T00:00:00.000Z',
                        birth_place: 'Bandar Lampung',
                        birth_order: 1,
                        domicile_town: 'Pasar Minggu',
                        domicile_province: 'jakarta',
                        hometown_province: 'lampung',
                        ethnic: 'lampung',
                        manhaj: 'SALAF',
                        gender: 'WANITA',
                        marriage_status: 'LAJANG',
                        marriage_permission: 'NON_POLIGAMI',
                    },
                };
                data.Skill = {
                    createMany: {
                        data: [
                            {
                                title: 'public speaking bagus',
                            },
                            {
                                title: 'mengendarai mobil',
                            },
                            {
                                title: 'mengelola keuangan',
                            },
                            {
                                title: 'mengendalikan emosi',
                            },
                        ],
                    },
                };
                data.Hobby = {
                    createMany: {
                        data: [
                            { title: 'membaca buku' },
                            { title: 'berkebun' },
                            { title: 'memasak' },
                        ],
                    },
                };
                data.Education = {
                    createMany: {
                        data: [
                            {
                                institution_name: 'Universitas Al-Bashiroh',
                                degree: 'Bachelor',
                                major: 'Japanese Literature',
                                city: 'Jakarta',
                                startYear: 2022,
                            },
                            {
                                institution_name: 'SMA Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2019,
                            },
                            {
                                institution_name: 'SMP Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2016,
                            },
                        ],
                    },
                };
                data.Married_goal = {
                    createMany: {
                        data: [
                            { title: 'menyempurnakan satu sama lain' },
                            { title: 'memiliki banyak keturunan' },
                            { title: 'bersama hingga ujung usia' },
                        ],
                    },
                };
                data.Life_goal = {
                    createMany: {
                        data: [
                            { title: 'hidup tenang di hari tua' },
                            { title: 'menjalin hubungan keluarga yang erat' },
                            { title: 'menjaga kesehatan tubuh' },
                        ],
                    },
                };
                data.Physic_character = {
                    createMany: {
                        data: [
                            {
                                title: 'rambut',
                                description: 'hitam kemerahan',
                            },
                            {
                                title: 'bentuk wajah',
                                description: 'lonjong',
                            },
                            {
                                title: 'mata',
                                description: 'hitam kecoklatan',
                            },
                            {
                                title: 'tinggi',
                                description: '165 cm',
                            },
                            {
                                title: 'berat',
                                description: '50 kg',
                            },
                        ],
                    },
                };
            }
            await prisma.user.upsert({
                where: { email },
                update: data,
                create: data,
            });
        }
    }

    console.log('Seed: User');
}
