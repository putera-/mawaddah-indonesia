import { PrismaClient } from '@prisma/client';
import {faker } from '@faker-js/faker';
export async function sliderSeed(prisma: PrismaClient, id: string) {
  for (let i = 0; i < 100; i++) {
    const data = {
      title: faker.lorem.sentence(),
      photo: faker.image.urlPicsumPhotos(),
      clientId: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await prisma.slider.upsert({
        where: { id },
        update: data,
        create: data,
    });

  }

    console.log('Seed: Slider');
}