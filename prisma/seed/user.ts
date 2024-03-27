import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

export async function userSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);

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
