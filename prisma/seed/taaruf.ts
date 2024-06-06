import { Prisma, PrismaClient } from '@prisma/client';

export async function taarufSeed(prisma: PrismaClient) {
    const users = await prisma.user.findMany({
        where: {
            role: 'MEMBER',
            biodata: { isNot: null },
        },
        include: {
            biodata: true,
        },
    });

    for (let i = 0; i < users.length; i++) {
        process.stdout.write('.');

        const user = users[i];
        const biodata = user.biodata;

        const candidate = await prisma.user.findFirst({
            where: {
                role: 'MEMBER',
                // biodata: { id: { not: undefined } },
                // TODO FIX THIS
                biodata: { NOT: null, gender: { not: biodata.gender } },
                // biodata: {AND : {}},
                AND: {
                    Taaruf: {
                        some: {
                            OR: [
                                {
                                    status: false,
                                },
                                {
                                    status: true,
                                    approval: {
                                        status: {
                                            not: 'Yes',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    Taaruf_candidate: {
                        some: {
                            OR: [
                                {
                                    status: false,
                                },
                                {
                                    status: true,
                                    approval: {
                                        status: {
                                            not: 'Yes',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
            // select: {
            //     Taaruf: true,
            // },
        });
        const data: Prisma.TaarufCreateInput = {
            message: 'Mari bertaaruf',
            user: { connect: { id: user.id } },
            candidate: { connect: { id: candidate.id } },
            approval: {
                create: {
                    message: 'Saya terima taarufnya',
                    reply: '',
                },
            },
        };
        await prisma.taaruf.create({
            data,
        });
    }
    console.log('Seed: Taaruf');

    // randomize user
    // find user with opposite gender + taaruf & taaruf candidate null
}
