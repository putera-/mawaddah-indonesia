import { Prisma, PrismaClient } from '@prisma/client';

export async function answerSeed(prisma: PrismaClient) {
    const questions = await prisma.question.findMany();

    const users = await prisma.user.findMany({
        where: {
            role: 'MEMBER',
        },
        include: {
            biodata: true,
        },
        // take: 10, // limit to 10 users for this example
    });

    for (let i = 0; i < users.length; i++) {
        if (!users[i].biodata) continue;

        process.stdout.write('.');
        const answers: Prisma.AnswerCreateManyInput[] = [];

        for (const q of questions) {
            const answer: Prisma.AnswerCreateManyInput = {
                biodataId: users[i].biodata.id,
                questionId: q.id,
                answer: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Id ultricies morbi hac nullam cursus iaculis.',
            };
            answers.push(answer);
        }

        await prisma.answer.createMany({
            data: answers,
        });
    }

    console.log('\nSeeder Finish: Answer');
}
