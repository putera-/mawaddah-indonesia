import { ApprovalStatus, Prisma, PrismaClient, TaarufProcess } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/user.interface';
import { Nadhar } from 'src/nadhar/nadhar.interface';
import { Khitbah } from 'src/khitbah/khitbah.interface';
import { Akad } from 'src/akad/akad.interface';

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
        let requestCount = 0;
        process.stdout.write('.');

        const user = users[i];
        const biodata = user.biodata;
        // const candidate = await prisma.user.findFirst({
        //     where: {
        //         biodata: { gender: { not: biodata.gender } },
        //     },
        //     include: {
        //         biodata: true,
        //         Taaruf_candidate: {
        //             where: {
        //                 active: false,
        //             },
        //         },
        //         Taaruf: {
        //             where: {
        //                 active: false,
        //             },
        //         },
        //     },
        // });


        for (let j = 0; j < users.length; j++) {
            const candidate = users[j];
            if (candidate.id == user.id) continue;

            if (candidate.biodata.gender == biodata.gender) continue;


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
                console.log('send Message Request Taaruf');
                await sendMessageAndInbox(taaruf.id, user.id, candidate.id, title, message, TaarufProcess.TaarufRequest);

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

                    console.log('send Message Response Taaruf');
                    await sendMessageAndInbox(taaruf.id, candidateTaaruf.id, taaruf.userId, responseTaarufTitle, messageResponseTaaruf, taarufProcess);
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
                    const title = `${requester.firstname} telah mengajukan permintaan nadhar`;
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
                    await sendMessageAndInbox(taaruf.id, requester.id, responder.id, title, message, TaarufProcess.NadharRequest);
                }

                if (!requestNadhar) continue;

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
                    const responseNadharTitle = `${responder.firstname} telah ${approveNadhar ? 'menerima' : 'menolak'} permintaan nadhar`;

                    console.log('send Message Response Nadhar ==##');
                    await sendMessageAndInbox(taaruf.id, responder.id, requester.id, responseNadharTitle, messageResponseNadhar, taarufProcess);
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
                    const title = `${requester.firstname} telah mengajukan permintaan khitbah`;
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
                    await sendMessageAndInbox(taaruf.id, requester.id, responder.id, title, message, TaarufProcess.KhitbahRequest);
                }

                if (!requestKhitbah) continue;

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
                    const title = `${responder.firstname} telah ${approveKhitbah ? 'menerima' : 'menolak'} permintaan khitbah`;

                    console.log('send Message Response Khitbah ==##==##');
                    await sendMessageAndInbox(taaruf.id, responder.id, requester.id, title, messageResponseKhitbah, taarufProcess);
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
                    const title = `${requester.firstname} telah mengajukan permintaan akad`;
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
                    await sendMessageAndInbox(taaruf.id, requester.id, responder.id, title, message, TaarufProcess.AkadRequest);
                }

                if (!requestAkad) continue;

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
                    const title = `${responder.firstname} telah ${approveAkad ? 'menerima' : 'menolak'} permintaan akad`;

                    console.log('send Message Response Akad ==##==##==##');
                    await sendMessageAndInbox(taaruf.id, responder.id, requester.id, title, messageResponseAkad, taarufProcess);
                }

            }
        }

    }
    console.log('\nSeed Finish: Taaruf');

    // randomize user
    // find user with opposite gender + taaruf & taaruf candidate null
}


async function sendMessageAndInbox(taarufId: string, senderId: string, receiverId: string, title: string, message: string, taaruf_process) {
    // CREATE inbox sender & receiver
    const dataInbox = {
        taaruf: { connect: { id: taarufId } },
        title,
        datetime: new Date(),
        messages: {
            create: {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
                message: message + ' ' + faker.lorem.paragraphs(4),
                title,
                taaruf_process
            }
        }
    }

    const dataSenderInbox: Prisma.InboxCreateInput = {
        ...dataInbox,
        user: { connect: { id: senderId } },
        responder: { connect: { id: receiverId } },
        read: true, // mark as read
    }
    const dataReceiverInbox: Prisma.InboxCreateInput = {
        ...dataInbox,
        user: { connect: { id: receiverId } },
        responder: { connect: { id: senderId } },
        read: false, // mark as unread
    }

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
