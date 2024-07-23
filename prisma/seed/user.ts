import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

export async function userSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);

    // SUPERADMIN
    {
        const superadmin = {
            lastname: 'So Super',
            active: true,
            verified: true,
            avatar: '/dummy/abang.png',
            avatar_md: '/dummy/abang.png',
            activations: {
                create: {
                    expiredAt: new Date(),
                },
            },
        };

        // create 10 SUPERADMIN
        for (let i = 0; i < 10; i++) {
            const email = `superadmin${i}@prisma.io`;
            const firstname = 'Bob' + i;
            const data: Prisma.UserCreateInput = {
                ...superadmin,
                email,
                firstname,
                role: 'SUPERADMIN',
                password: {
                    create: {
                        password
                    }
                }
            }
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

    // ADMIN
    {
        const admin = {
            lastname: 'Admin',
            active: true,
            verified: true,
            avatar: '/dummy/abang.png',
            avatar_md: '/dummy/abang.png',
            activations: {
                create: {
                    expiredAt: new Date(),
                },
            },
        };

        // create 10 ADMIN
        for (let i = 0; i < 10; i++) {
            const email = `admin${i}@prisma.io`;
            const firstname = 'Bob' + i;
            const data: Prisma.UserCreateInput = {
                ...admin,
                email,
                firstname,
                role: 'ADMIN',
                password: {
                    create: {
                        password
                    }
                }
            }
            await prisma.user.upsert({
                where: { email },
                update: {
                    email,
                    firstname,
                    role: 'ADMIN',
                    ...admin,
                },
                create: {
                    email,
                    firstname,
                    role: 'ADMIN',
                    ...admin,
                },
            });
        }
    }

    console.log('Seed: User Admin');
}
