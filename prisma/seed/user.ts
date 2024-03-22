import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import * as bcrypt from 'bcrypt';

export async function userSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);
    const MyUserpassword = await bcrypt.hash('koboKanaeru@2232', 10);

    // SUPERADMIN
    {
        const superadmin = {
            lastname: 'So Super',
            password,
            verified: true,
            avatar: '/dummy/abang.png',
            avatar_md: '/dummy/abang.png',
            activations: {
                create: {
                    activation_key: faker.string.alphanumeric(),
                    expiredAt: new Date(),
                },
            },
        };

        const myUser = {
            id: '0766a4ea-ac7a-49b1-acca-49f3a4c24648',
            firstname: 'Valent',
            lastname: 'Stefanos',
            password: MyUserpassword,
            verified: true,
            avatar: faker.image.urlLoremFlickr(),
            avatar_md: faker.image.urlLoremFlickr(),
            activations: {
                create: {
                    activation_key: faker.string.alphanumeric(),
                    expiredAt: new Date(),
                },
            },
        }
        await prisma.user.upsert({
            where: { email: 'adhika725@gmail.com' },
            create: {
                ...myUser,
                email: 'adhika725@gmail.com',
                Education: {
                    create: {
                        institution_name: 'Mawaddah University',
                        major: 'Computer Science',
                        degree: 'Bachelor of Science',
                        city: 'Dhaka',
                        startYear: 2010,
                        endYear: 2014,
                    },
                },
                Hobby: {
                    create: {
                        title: faker.word.sample(),
                    },
                },
                Skill: {
                    create: {
                        title: faker.word.sample(),
                    },
                },
                Married_goal: {
                    create: {
                        title: faker.word.sample(),
                    },
                },
            },
            update: {
                ...myUser,
            }
        });



        // create 10 SUPERADMIN
        for (let i = 0; i < 10; i++) {
            const email = `superadmin_${i}@prisma.io`;
            const firstname = "Bob" + i;
            await prisma.user.upsert({
                where: { email },
                update: {
                    email,
                    firstname,
                    role: 'SUPERADMIN',
                    ...superadmin,
                },
                create: {
                    email,
                    firstname,
                    role: 'SUPERADMIN',
                    ...superadmin,
                }
            });
        }
    }

    // BOB
    {
        const bob = {
            lastname: faker.person.lastName(),
            password,
            verified: true,
            avatar: faker.image.avatar(),
            avatar_md: faker.image.avatar(),
            activations: {
                create: {
                    activation_key: faker.string.alphanumeric(10),
                    expiredAt: new Date(),
                },
            },
        };

        // create 100 Bob MEMBER
        for (let i = 0; i < 100; i++) {
            const email = `bob_${i}@prisma.io`;
            const firstname = faker.person.firstName();
            await prisma.user.upsert({
                where: { email },
                update: {
                    email,
                    firstname,
                    ...bob,
                },
                create: {
                    email,
                    firstname,
                    ...bob,
                    Education: {
                        create: {
                            institution_name: faker.lorem.word(),
                            startYear: faker.date.birthdate({ min: 2010, max: 2015 }).getFullYear(),
                            endYear: faker.date.birthdate({ min: 2015, max: 2020 }).getFullYear(),
                        }
                    },
                    Hobby: {
                        create: {
                            title: faker.lorem.word(),
                        }
                    },
                    Skill: {
                        create: {
                            title: faker.lorem.word(),
                        }
                    },
                    Married_goal: {
                        create: {
                            title: faker.lorem.word(),
                        }
                    }
                }
            });
        }
    }

    // ALICE
    {
        const alice = {
            lastname: faker.person.lastName('female'),
            password,
            verified: true,
            avatar: faker.image.avatar(),
            avatar_md: faker.image.avatar(),
            activations: {
                create: {
                    activation_key: faker.string.alphanumeric(10),
                    expiredAt: new Date(),
                },
            },
        };

        // create 100 Alice MEMBER
        for (let i = 0; i < 100; i++) {
            const email = faker.internet.email();
            const firstname = faker.person.firstName('female');
            await prisma.user.upsert({
                where: { email },
                update: {
                    email,
                    firstname,
                    ...alice,
                },
                create: {
                    email,
                    firstname,
                    ...alice,
                }
            });
        }
    }

    console.log('Seed: User');
}
