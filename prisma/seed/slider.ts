import { PrismaClient } from '@prisma/client';
import {faker } from '@faker-js/faker';
export async function sliderSeed(prisma: PrismaClient, id: string) {
    const data = {
      title: `Slider `,
    }

    await prisma.slider.upsert({
        where: { id },
        update: data,
        create: data,
    });

    console.log('Seed: Client');
}