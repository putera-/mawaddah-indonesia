//cari user dengan role member
//secara random, bikin punya data taaruf gold
//status di payment ada 2, pending || settlemnet
// tanggal taaruf gold, started at? & ending atnya random

import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

export async function taaruf_goldSeed(prisma: PrismaClient) {
    console.log('\nSeed Start: Taaruf Gold & Payment');
    //cari user dengan role member
    const users = await prisma.user.findMany({
        where: {
            role: 'MEMBER',
        },
    });

    const selectedUsers = [];
    for (let i = 0; i < 100; i++) {
        if (i % 2 == 0) selectedUsers.push(i);
    }

    //secara random, bikin punya data taaruf gold
    for (let i = 0; i < users.length; i++) {
        process.stdout.write('.');
        if (selectedUsers.indexOf(i) != -1) {
            const paymentStatus =
                Math.random() < 0.5 ? 'pending' : 'settlement';

            const startedAt = new Date();
            const endingAt = dayjs().add(1, 'month').toISOString();

            const user = users[i];
            await prisma.taaruf_gold.create({
                data: {
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                    startedAt,
                    endingAt,
                    Payment: {
                        create: {
                            user: {
                                connect: {
                                    id: user.id,
                                },
                            },
                            gross_amount: 100000,
                            paidAt: new Date(),
                            status: paymentStatus,
                        },
                    },
                },
            });

            await prisma.payment.updateMany({
                where: {
                    status: 'PENDING',
                },
                data: {
                    paidAt: null,
                },
            });

            await prisma.taaruf_gold.updateMany({
                where: {
                    Payment: {
                        status: 'PENDING',
                    },
                },
                data: {
                    startedAt: null,
                    endingAt: null,
                },
            });
        }
    }

    console.log('\nSeed Finish: Taaruf Gold & Payment');
}
