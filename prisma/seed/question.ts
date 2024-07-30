import { PrismaClient } from '@prisma/client';

export async function questionSeeder(prisma: PrismaClient) {
    const admin = await prisma.user.findFirst({
        where: {
            role: 'ADMIN',
        },
    });

    const questions: string[] = [
        'Bagaimana cara Anda mengatasi perbedaan pendapat dalam suatu diskusi dengan pasangan?',
        'Seberapa sering Anda ingin melakukan diskusi mendalam tentang hubungan Anda dengan pasangan?',
        'Bagaimana cara Anda memberikan kritik atau masukan kepada pasangan tanpa menyakiti perasaannya?',
        'Apakah Anda ingin Anda dan pasangan memiliki anggaran keuangan bersama?',
        'Bagaimana Anda mengatasi perbedaan pendapat tentang pengeluaran besar?',
        'Apakah Anda merasa nyaman membicarakan topik seksual dengan pasangan?',
        'Bagaimana cara Anda dan pasangan menjaga keintiman dalam hubungan?',
        'Apakah Anda memiliki rencana untuk memiliki anak? Jika ya, kapan?',
        'Seberapa sering Anda melibatkan keluarga besar dalam keputusan pernikahan Anda?',
        'Bagaimana Anda mengatasi masalah jika ada konflik antara pasangan dan keluarga besar?',
        'Bagaimana Anda dan pasangan membagi tugas rumah tangga sehari-hari?',
        'Apakah ada tugas rumah tangga yang Anda tidak suka lakukan? Bagaimana Anda mengatasinya?',
    ];

    for (let i = 0; i < questions.length; i++) {
        await prisma.question.create({
            data: {
                question: questions[i],
                createdBy: {
                    connect: {
                        id: admin.id,
                    },
                },
            },
        });
    }

    console.log('\nSeed Finish: Questions');
}
