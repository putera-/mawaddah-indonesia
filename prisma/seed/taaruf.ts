import { ApprovalStatus, Prisma, PrismaClient, TaarufProcess } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/user.interface';

let _prisma: PrismaClient;

export async function taarufSeed(prisma: PrismaClient) {
    _prisma = prisma;

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
        const candidate = await prisma.user.findFirst({
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

        const applyTaaruf = faker.datatype.boolean();
        console.log({ applyTaaruf });

        // opposie gender
        if (applyTaaruf &&
            (candidate.Taaruf.length == 0 ||
                candidate.Taaruf_candidate.length == 0)
        ) {
            const title = `${user.firstname} telah mengajukan permintaan taaruf`;
            const message = 'Mari bertaaruf';
            const data: Prisma.TaarufCreateInput = {
                message,
                user: { connect: { id: user.id } },
                candidate: { connect: { id: candidate.id } },
            };

            // TAARUF
            const taaruf = await prisma.taaruf.create({
                data,
            });

            // CREATE inbox sender & receiver
            await sendMessageAndInbox('taaruf', taaruf.id, user.id, candidate.id, title, message);

            // RESPONSE TAARUF
            const approveTaaruf = faker.datatype.boolean();
            {
                console.log({ approveTaaruf });

                const candidateTaaruf: User = candidate;
                const approvalTaaruf = approveTaaruf ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
                const taarufProcess = approveTaaruf ? TaarufProcess.TaarufApproved : TaarufProcess.TaarufRejected;
                const messageResponseTaaruf = approveTaaruf ?
                    'Saya menyetujui permintaan taaruf, mari kita bertemu' : 'Maaf saya menolak permintaan taaruf';

                const response: Prisma.ResponseCreateInput = {
                    message: messageResponseTaaruf,
                    responseBy: { connect: { id: candidateTaaruf.id } }
                }
                await prisma.taaruf.update({
                    where: { id: taaruf.id, candidateId: candidateTaaruf.id },
                    data: {
                        status: approvalTaaruf,
                        taaruf_process: taarufProcess,
                        response: {
                            create: response
                        }
                    }
                });

                // CREATE inbox sender & receiver
                const responseTaarufTitle = `${candidateTaaruf.firstname} telah ${approveTaaruf ? 'menerima' : 'menolak'} permintaan taaruf`;

                await sendMessageAndInbox('taaruf', taaruf.id, candidateTaaruf.id, taaruf.userId, responseTaarufTitle, messageResponseTaaruf);
            }

            // STOP if approval is rejected
            if (!approveTaaruf) continue;

            // REQUEST NADHAR
            const requestNadhar = faker.datatype.boolean();
            console.log({ requestNadhar });
            const schedule = faker.date.future();

            const randomRequester = faker.datatype.boolean();;
            const requester: User = randomRequester ? user : candidate;
            const responder: User = randomRequester ? candidate : user;
            if (requestNadhar) {
                const title = `${requester.firstname} telah mengajukan permintaan nadhar`;
                const message = 'Mari bertemu untuk nadhar';
                await prisma.nadhar.create({
                    data: {
                        Taaruf: { connect: { id: taaruf.id } },
                        schedule,
                        message,
                        requestBy: { connect: { id: requester.id } },
                        status: ApprovalStatus.Pending
                    },
                });

                // update taaruf to Nadhar Request
                await prisma.taaruf.update({
                    where: { id: taaruf.id },
                    data: {
                        taaruf_process: TaarufProcess.NadharRequest
                    }
                });
                await sendMessageAndInbox('taaruf', taaruf.id, requester.id, responder.id, title, message);
            }

            // RESPONSE NADHAR
            const approveNadhar = faker.datatype.boolean();
            {
                console.log({ approveNadhar });

                // const candidateTaaruf: User = candidate;
                const approvalTaaruf = approveTaaruf ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
                const taarufProcess = approveTaaruf ? TaarufProcess.NadharApproved : TaarufProcess.NadharRejected;
                const messageResponseNadhar = approveTaaruf ?
                    'Saya menyetujui permintaan nadhar, mari kita bertemu' : 'Maaf saya menolak permintaan nadhar';

                const response: Prisma.ResponseCreateInput = {
                    message: messageResponseNadhar,
                    responseBy: { connect: { id: responder.id } }
                }
                await prisma.taaruf.update({
                    where: { id: taaruf.id },
                    data: {
                        status: approvalTaaruf,
                        taaruf_process: taarufProcess,
                        response: {
                            create: response
                        }
                    }
                });

                // CREATE inbox sender & receiver
                const responseNadharTitle = `${responder.firstname} telah ${approveNadhar ? 'menerima' : 'menolak'} permintaan taaruf`;

                await sendMessageAndInbox('taaruf', taaruf.id, responder.id, requester.id, responseNadharTitle, messageResponseNadhar);
            }
            // STOP if approval is rejected
            if (!approveNadhar) continue;

        }
    }
    console.log('\nSeed Finish: Taaruf');

    // randomize user
    // find user with opposite gender + taaruf & taaruf candidate null
}


async function sendMessageAndInbox(type: 'taaruf' | 'nadhar' | 'khitbah' | 'akad', taarufId: string, userId: string, candidateId: string, title: string, message: string) {
    // CREATE inbox sender & receiver
    const _dataInbox = {
        // taaruf: { connect: { id: taaruf.id } },
        title,
        datetime: new Date(),
        messages: {
            create: {
                sender: { connect: { id: userId } },
                receiver: { connect: { id: candidateId } },
                message,
                title,
                taaruf_process: TaarufProcess.TaarufRequest
            }
        }
    }

    let dataInbox: Prisma.InboxCreateWithoutUserInput;

    if (type == 'taaruf') {
        dataInbox = {
            ..._dataInbox,
            taaruf: { connect: { id: taarufId } },
        }
    }

    const dataSenderInbox: Prisma.InboxCreateInput = {
        ...dataInbox,
        user: { connect: { id: userId } },
        read: true, // mark as read
    }
    const dataReceiverInbox: Prisma.InboxCreateInput = {
        ...dataInbox,
        user: { connect: { id: candidateId } },
        read: false, // mark as unread
    }

    await Promise.all([
        // _prisma.inbox.create({ data: dataSenderInbox }),
        // _prisma.inbox.create({ data: dataReceiverInbox })
        _prisma.inbox.upsert({
            where: {
                userId_taarufId: {
                    userId: userId,
                    taarufId
                }
            },
            create: dataSenderInbox,
            update: dataSenderInbox,
        }),
        _prisma.inbox.upsert({
            where: {
                userId_taarufId: {
                    userId: candidateId,
                    taarufId
                }
            },
            create: dataReceiverInbox,
            update: dataReceiverInbox,
        }),
    ]);
}
