import { Prisma, PrismaClient } from '@prisma/client';

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
            const firstname = 'Bob' + i;
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
                },
            });
        }
    }

    console.log('Seed: User SuperAdmin');
}
