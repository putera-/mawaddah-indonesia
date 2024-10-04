import { Prisma, PrismaClient } from '@prisma/client';

export async function taarufSeed(prisma: PrismaClient) {
    console.log('\nSeed Start: Taaruf');
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
                biodata: { gender: { not: biodata.gender } },
            },
            include: {
                biodata: true,
                Taaruf_candidate: {
                    where: {
                        active: false,
                    },
                },
                Taaruf: {
                    where: {
                        active: false,
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
            };
            const taaruf = await prisma.taaruf.create({
                data,
            });

            {
                // CREATE inbox sender & receiver
                const dataInbox: Prisma.InboxCreateWithoutUserInput = {
                    taaruf: { connect: { id: taaruf.id } },
                    title: `${user.firstname} telah mengajukan permintaan taaruf`,
                    datetime: new Date(),
                }
                const dataSenderInbox: Prisma.InboxCreateInput = {
                    ...dataInbox,
                    user: { connect: { id: user.id } },
                    read: true, // mark as read
                }
                const dataReceiverInbox: Prisma.InboxCreateInput = {
                    ...dataInbox,
                    user: { connect: { id: opposite.id } },
                    read: false, // mark as unread
                }

                await Promise.all([
                    prisma.inbox.create({ data: dataSenderInbox }),
                    prisma.inbox.create({ data: dataReceiverInbox })
                ]);
            }
            // console.log(result);
        }
    }
    console.log('\nSeed Finish: Taaruf');

    // randomize user
    // find user with opposite gender + taaruf & taaruf candidate null
}
