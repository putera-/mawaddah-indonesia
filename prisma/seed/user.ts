import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function userSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);

    const alice: Prisma.UserCreateInput = {
        email: 'alice@prisma.io',
        firstname: 'Alice',
        lastname: 'In Wonderland',
        password,
        verified: true,
        avatar: 'photo/nissa.png',
        avatar_md: 'photo/nissa.png',
        activations: {
            create: {
                activation_key: 'lkjhafklhj@#$@#$@#dsfa',
                expiredAt: new Date(),
            },
        },
    };

    const bob: Prisma.UserCreateInput = {
        email: 'bob@prisma.io',
        firstname: 'Bob',
        lastname: 'Is My Name',
        password,
        verified: true,
        avatar: 'photo/abang.png',
        avatar_md: 'photo/abang.png',
        activations: {
            create: {
                activation_key: 'lkjhafklhj@#$@#$@#dsfa',
                expiredAt: new Date(),
            },
        },
    };

    const superadmin: Prisma.UserCreateInput = {
        email: 'superadmin@prisma.io',
        firstname: 'Bob',
        lastname: 'Is My Name',
        password,
        verified: true,
        activations: {
            create: {
                activation_key: 'lkjhafklhj@#$@#$@#dsfa',
                expiredAt: new Date(),
            },
        },
    };

    await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: alice,
        create: alice,
    });

    await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: bob,
        create: bob,
    });

    await prisma.user.upsert({
        where: { email: 'superadmin@prisma.io' },
        update: {
            ...superadmin,
            role: 'SUPERADMIN',
        },
        create: {
            ...superadmin,
            role: 'SUPERADMIN',
        },
    });

    console.log('Seed: User');
}
