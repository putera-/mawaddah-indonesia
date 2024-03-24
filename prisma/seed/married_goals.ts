import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function married_goalsSeed(prisma: PrismaClient, userId: string) {
    for (let i = 0; i < 20; i++) {
        await prisma.married_goal.createMany({
            data: [
                    {
                        title: faker.lorem.sentence(),
                        userId: userId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
    
                ],
        });

    }

    console.log('Seed: Married Goals');
}
