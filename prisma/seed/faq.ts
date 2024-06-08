import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
export async function faqSeed(prisma: PrismaClient, id: string) {
    for (let i = 0; i < 100; i++) {
        const data = {
            question: faker.word.words(),
            answer: faker.word.words(),
            clientId: id,
            createdAt: new Date(faker.date.past({ years: 10 })),
            updatedAt: new Date(faker.date.recent()),
        }
9
        await prisma.fAQ.upsert({
            where: { id },
            update: data,
            create: data,
        });

    }

    console.log('Seed: FAQ');
}
