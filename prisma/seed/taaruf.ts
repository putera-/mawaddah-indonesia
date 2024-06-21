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
        const opposite = await prisma.user.findFirst({
            where: {
                // TODO FIX THIS
                biodata: { gender: { not: biodata.gender } },
            },
            include: {
                biodata: true,
                Taaruf_candidate: {
                    where: {
                        status: false,
                    },
                },
                Taaruf: {
                    where: {
                        status: false,
                    },
                },
            },
        });
        if (
            opposite.Taaruf.length == 0 ||
            opposite.Taaruf_candidate.length == 0
        ) {
            const data: Prisma.TaarufCreateInput = {
                message: 'Mari bertaaruf',
                user: { connect: { id: user.id } },
                candidate: { connect: { id: opposite.id } },
                approval: {
                    create: {
                        message: '',
                        reply: '',
                    },
                },
            };
            const result = await prisma.taaruf.create({
                data,
            });
            console.log(result);
        }
    }
    console.log('Seed: Taaruf');

    // randomize user
    // find user with opposite gender + taaruf & taaruf candidate null
}
