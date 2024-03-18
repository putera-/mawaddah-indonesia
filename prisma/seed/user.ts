import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function userSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);

    const alice = {
        email: 'alice@prisma.io',
        firstname: 'Alice',
        lastname: 'In Wonderland',
        password,
        verified: true,
        activations: {
            create: {
                activation_key: 'lkjhafklhj@#$@#$@#dsfa',
                expiredAt: 1710734269703
            }
        }
    };

    const bob = {
        email: 'bob@prisma.io',
        firstname: 'Bob',
        lastname: 'Is My Name',
        password,
        verified: true,
        activations: {
            create: {
                activation_key: 'lkjhafklhj@#$@#$@#dsfa',
                expiredAt: 1710734269703
            }
        }
    };

    const superadmin = {
        email: 'superadmin@prisma.io',
        firstname: 'Bob',
        lastname: 'Is My Name',
        password,
        verified: true,
        activations: {
            create: {
                activation_key: 'lkjhafklhj@#$@#$@#dsfa',
                expiredAt: 1710734269703
            }
        }
    };

    await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: alice,
        create: alice
    });

    await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: bob,
        create: bob
    });

    await prisma.user.upsert({
        where: { email: 'superadmin@prisma.io' },
        update: {
            ...superadmin,
            role: 'SUPERADMIN'
        },
        create: {
            ...superadmin,
            role: 'SUPERADMIN'
        }
    });


    console.log('Seed: User');
};
