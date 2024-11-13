import { ApprovalStatus, Prisma, PrismaClient, Taaruf, TaarufProcess, TaarufStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/user.interface';
import { Nadhar } from 'src/nadhar/nadhar.interface';
import { Khitbah } from 'src/khitbah/khitbah.interface';
import { Akad } from 'src/akad/akad.interface';
import dayjs from 'dayjs';

let _prisma: PrismaClient;

let createdAtMessage = undefined;

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
        let requestCount = 0;
        process.stdout.write('.');

        const user = users[i];
        const biodata = user.biodata;

        // recheck if requester already has taaruf
        const requester2 = await prisma.user.findFirst({
            where: { id: user.id }
        });

        // skip if already active
        if (requester2.taaruf_status == TaarufStatus.ACTIVE) continue;


        for (let j = 0; j < users.length; j++) {
            createdAtMessage = undefined;
            let _continue = false;
            const candidate = users[j];
            if (candidate.id == user.id) continue;
            if (candidate.biodata.gender == biodata.gender) continue;


            // recheck if requester already has taaruf
            const requester = await prisma.user.findFirst({
                where: { id: user.id }
            });

            // stop loop candidate
            if (requester.taaruf_status == TaarufStatus.ACTIVE) break;


            const _candidate = await prisma.user.findFirst({
                where: { id: candidate.id }
            });
            //  stop process candidate
            if (_candidate.taaruf_status == TaarufStatus.ACTIVE) continue;


            const applyTaaruf = faker.datatype.boolean();
            console.log({ applyTaaruf });

            // opposie gender
            // if (applyTaaruf &&
            //     (candidate.Taaruf.length == 0 ||
            //         candidate.Taaruf_candidate.length == 0)
            // ) {
            if (applyTaaruf) {
                if (requestCount == 12) continue;

                ++requestCount;

                console.log({ requestCount })
                const titleSender = `Anda telah mengajukan permintaan taaruf`;
                const titleReceiver = `${user.firstname} telah mengajukan permintaan taaruf`;
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
                console.log('send Message Request Taaruf');
                await sendMessageAndInbox(taaruf.id, user.id, candidate.id, titleSender, titleReceiver, message, TaarufProcess.TaarufRequest, taaruf.id);

                _continue = faker.datatype.boolean();
                if (_continue) continue;

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
                    const responseTaarufTitleSender = `Anda telah ${approveTaaruf ? 'menerima' : 'menolak'} permintaan taaruf`;
                    const responseTaarufTitleReceiver = `${candidateTaaruf.firstname} telah ${approveTaaruf ? 'menerima' : 'menolak'} permintaan taaruf`;

                    console.log('send Message Response Taaruf');
                    await sendMessageAndInbox(taaruf.id, candidateTaaruf.id, taaruf.userId, responseTaarufTitleSender, responseTaarufTitleReceiver, messageResponseTaaruf, taarufProcess, taaruf.id);

                    // ACTIVATE TAARUF STATUS keduanya
                    if (approveTaaruf) {
                        await prisma.user.updateMany({
                            where: { id: { in: [taaruf.userId, taaruf.candidateId] } },
                            data: {
                                taaruf_status: TaarufStatus.ACTIVE,
                            }
                        });
                    }
                }

                // STOP if approval is rejected
                if (!approveTaaruf) continue;

                // REQUEST NADHAR
                const requestNadhar = faker.datatype.boolean();
                console.log({ requestNadhar });
                let schedule = faker.date.future();

                let randomRequester = faker.datatype.boolean();;
                let requester: User = randomRequester ? user : candidate;
                let responder: User = randomRequester ? candidate : user;
                let nadharData: Nadhar;

                if (requestNadhar) {
                    const titleSender = `Anda telah mengajukan permintaan nadhar`;
                    const titleReceiver = `${requester.firstname} telah mengajukan permintaan nadhar`;
                    const message = 'Mari bertemu untuk nadhar';
                    nadharData = await prisma.nadhar.create({
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
                    console.log('send Message Request Nadhar ==##');
                    await sendMessageAndInbox(taaruf.id, requester.id, responder.id, titleSender, titleReceiver, message, TaarufProcess.NadharRequest, nadharData.id);
                }

                if (!requestNadhar) continue;

                _continue = faker.datatype.boolean();
                if (_continue) continue;

                // RESPONSE NADHAR
                const approveNadhar = faker.datatype.boolean();
                {
                    console.log({ approveNadhar });

                    // const candidateTaaruf: User = candidate;
                    const approval = approveNadhar ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
                    const taarufProcess = approveNadhar ? TaarufProcess.NadharApproved : TaarufProcess.NadharRejected;
                    const messageResponseNadhar = approveNadhar ?
                        'Saya menyetujui permintaan nadhar, mari kita bertemu' : 'Maaf saya menolak permintaan nadhar';

                    const response: Prisma.ResponseCreateInput = {
                        message: messageResponseNadhar,
                        responseBy: { connect: { id: responder.id } }
                    }

                    // update nahdar status with response
                    await prisma.nadhar.update({
                        where: { id: nadharData.id },
                        data: {
                            status: approval,
                            response: {
                                create: response
                            }
                        }
                    });

                    await prisma.taaruf.update({
                        where: { id: taaruf.id },
                        data: {
                            taaruf_process: taarufProcess,
                        }
                    });

                    // CREATE inbox sender & receiver
                    const responseNadharTitleSender = `Anda telah ${approveNadhar ? 'menerima' : 'menolak'} permintaan nadhar`;
                    const responseNadharTitleReceiver = `${responder.firstname} telah ${approveNadhar ? 'menerima' : 'menolak'} permintaan nadhar`;

                    console.log('send Message Response Nadhar ==##');
                    await sendMessageAndInbox(taaruf.id, responder.id, requester.id, responseNadharTitleSender, responseNadharTitleReceiver, messageResponseNadhar, taarufProcess, nadharData.id);
                }
                // STOP if approval is rejected
                if (!approveNadhar) continue;

                // REQUEST KHITBAH
                const requestKhitbah = faker.datatype.boolean();
                console.log({ requestKhitbah });
                schedule = faker.date.future();

                randomRequester = faker.datatype.boolean();;
                requester = randomRequester ? user : candidate;
                responder = randomRequester ? candidate : user;
                let khitbahData: Khitbah;

                if (requestKhitbah) {
                    const titleSender = `Anda telah mengajukan permintaan khitbah`;
                    const titleReceiver = `${requester.firstname} telah mengajukan permintaan khitbah`;
                    const message = 'Mari bertemu untuk khitbah';
                    khitbahData = await prisma.khitbah.create({
                        data: {
                            Taaruf: { connect: { id: taaruf.id } },
                            schedule,
                            message,
                            requestBy: { connect: { id: requester.id } },
                            status: ApprovalStatus.Pending
                        },
                    });

                    // update taaruf to Khitbah Request
                    await prisma.taaruf.update({
                        where: { id: taaruf.id },
                        data: {
                            taaruf_process: TaarufProcess.KhitbahRequest
                        }
                    });
                    console.log('send Message Request Khitbah ==##==##');
                    await sendMessageAndInbox(taaruf.id, requester.id, responder.id, titleSender, titleReceiver, message, TaarufProcess.KhitbahRequest, khitbahData.id);
                }

                if (!requestKhitbah) continue;

                _continue = faker.datatype.boolean();
                if (_continue) continue;

                // RESPONSE KHITBAH
                const approveKhitbah = faker.datatype.boolean();
                {
                    console.log({ approveKhitbah });

                    // const candidateTaaruf: User = candidate;
                    const approval = approveKhitbah ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
                    const taarufProcess = approveKhitbah ? TaarufProcess.KhitbahAppproved : TaarufProcess.KhitbahRejected;
                    const messageResponseKhitbah = approveKhitbah ?
                        'Saya menyetujui permintaan khitbah, mari kita tentukan akad' : 'Maaf saya menolak permintaan khitbah';

                    const response: Prisma.ResponseCreateInput = {
                        message: messageResponseKhitbah,
                        responseBy: { connect: { id: responder.id } }
                    }
                    // update khitbah status with response
                    await prisma.khitbah.update({
                        where: { id: khitbahData.id },
                        data: {
                            status: approval,
                            response: {
                                create: response
                            }
                        }
                    });

                    await prisma.taaruf.update({
                        where: { id: taaruf.id },
                        data: {
                            taaruf_process: taarufProcess,
                        }
                    });

                    // CREATE inbox sender & receiver
                    const titleSender = `Anda telah ${approveKhitbah ? 'menerima' : 'menolak'} permintaan khitbah`;
                    const titleReceiver = `${responder.firstname} telah ${approveKhitbah ? 'menerima' : 'menolak'} permintaan khitbah`;

                    console.log('send Message Response Khitbah ==##==##');
                    await sendMessageAndInbox(taaruf.id, responder.id, requester.id, titleSender, titleReceiver, messageResponseKhitbah, taarufProcess, khitbahData.id);
                }
                // STOP if approval is rejected
                if (!approveKhitbah) continue;

                // REQUEST AKAD
                const requestAkad = faker.datatype.boolean();
                console.log({ requestAkad });
                schedule = faker.date.future();

                randomRequester = faker.datatype.boolean();;
                requester = randomRequester ? user : candidate;
                responder = randomRequester ? candidate : user;
                let akadData: Akad;

                if (requestAkad) {
                    const titleSender = `Anda telah mengajukan permintaan akad`;
                    const titleReceiver = `${requester.firstname} telah mengajukan permintaan akad`;
                    const message = 'Yuk Nikah';
                    akadData = await prisma.akad.create({
                        data: {
                            Taaruf: { connect: { id: taaruf.id } },
                            schedule,
                            message,
                            requestBy: { connect: { id: requester.id } },
                            status: ApprovalStatus.Pending
                        },
                    });

                    // update taaruf to Akad Request
                    await prisma.taaruf.update({
                        where: { id: taaruf.id },
                        data: {
                            taaruf_process: TaarufProcess.AkadRequest
                        }
                    });
                    console.log('send Message Request Akad ==##==##==##');
                    await sendMessageAndInbox(taaruf.id, requester.id, responder.id, titleSender, titleReceiver, message, TaarufProcess.AkadRequest, akadData.id);
                }

                if (!requestAkad) continue;

                _continue = faker.datatype.boolean();
                if (_continue) continue;

                const simulateCancel = faker.datatype.boolean();
                if (simulateCancel) await doCancel(taaruf);
                if (simulateCancel) continue;

                // RESPONSE AKAD
                const approveAkad = faker.datatype.boolean();
                {
                    console.log('========================')
                    console.log({ approveAkad });

                    // const candidateTaaruf: User = candidate;
                    const approval = approveAkad ? ApprovalStatus.Approved : ApprovalStatus.Rejected;
                    const taarufProcess = approveAkad ? TaarufProcess.AkadApproved : TaarufProcess.AkadRejected;
                    const messageResponseAkad = approveAkad ?
                        'Saya menyetujui permintaan akad, mari kita menikah' : 'Maaf saya menolak permintaan akad';

                    const response: Prisma.ResponseCreateInput = {
                        message: messageResponseAkad,
                        responseBy: { connect: { id: responder.id } }
                    }
                    // update akad status with response
                    await prisma.akad.update({
                        where: { id: akadData.id },
                        data: {
                            status: approval,
                            response: {
                                create: response
                            }
                        }
                    });

                    await prisma.taaruf.update({
                        where: { id: taaruf.id },
                        data: {
                            taaruf_process: taarufProcess,
                        }
                    });

                    // CREATE inbox sender & receiver
                    const titleSender = `Anda telah ${approveAkad ? 'menerima' : 'menolak'} permintaan akad`;
                    const titleReceiver = `${responder.firstname} telah ${approveAkad ? 'menerima' : 'menolak'} permintaan akad`;

                    console.log('send Message Response Akad ==##==##==##');
                    await sendMessageAndInbox(taaruf.id, responder.id, requester.id, titleSender, titleReceiver, messageResponseAkad, taarufProcess, akadData.id);
                }

            }
        }

    }
    console.log('\nSeed Finish: Taaruf');

    // randomize user
    // find user with opposite gender + taaruf & taaruf candidate null
}


async function sendMessageAndInbox(taarufId: string, senderId: string, receiverId: string, titleSender: string, titleReceiver: string, message: string, taaruf_process: TaarufProcess, taaruf_process_id: string) {

    if (createdAtMessage == undefined) {
        createdAtMessage = faker.date.past();
    } else {
        createdAtMessage = dayjs(createdAtMessage)
            .add(faker.number.int({ min: 1, max: 3 }), 'day')
            .add(faker.number.int({ min: 1, max: 24 }), 'hour')
            .add(faker.number.int({ min: 1, max: 60 }), 'minute')
            .toDate();
    }

    const dataSenderInbox: Prisma.InboxCreateInput = {
        taaruf: { connect: { id: taarufId } },
        title: titleSender,
        datetime: new Date(),
        messages: {
            create: {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message: message + ' ' + faker.lorem.paragraphs(4),
                title: titleSender,
                taaruf_process,
                taaruf_process_id,
                createdAt: createdAtMessage
            }
        },
        user: { connect: { id: senderId } },
        responder: { connect: { id: receiverId } },
        read: true, // mark as read
    }

    const dataReceiverInbox: Prisma.InboxCreateInput = {
        taaruf: { connect: { id: taarufId } },
        title: titleReceiver,
        datetime: new Date(),
        messages: {
            create: {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message: message + ' ' + faker.lorem.paragraphs(4),
                title: titleReceiver,
                taaruf_process,
                taaruf_process_id,
                createdAt: createdAtMessage
            }
        },
        user: { connect: { id: receiverId } },
        responder: { connect: { id: senderId } },
        read: false, // mark as unread
    }

    // console.log({ dataSenderInbox })
    // console.log({ dataReceiverInbox })

    await Promise.all([
        _prisma.inbox.upsert({
            where: {
                userId_taarufId: {
                    userId: senderId,
                    taarufId
                }
            },
            create: dataSenderInbox,
            update: dataSenderInbox,
        }),
        _prisma.inbox.upsert({
            where: {
                userId_taarufId: {
                    userId: receiverId,
                    taarufId
                }
            },
            create: dataReceiverInbox,
            update: dataReceiverInbox,
        }),
    ]);
    await new Promise(resolve => setTimeout(resolve, 100));
}

async function doCancel(taaruf: Taaruf) {
    await Promise.all([
        _prisma.taaruf.update({
            where: { id: taaruf.id },
            data: {
                taaruf_process: TaarufProcess.Canceled,
            }
        }),
        _prisma.user.updateMany({
            where: { id: { in: [taaruf.userId, taaruf.candidateId] } },
            data: {
                taaruf_status: TaarufStatus.OPEN,
            }
        })
    ])
}
