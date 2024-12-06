import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

export async function blogs_seed(prisma: PrismaClient) {
    console.log('\nSeed Start: Blog');

    const images = [
        '/dummy/blog1',
        '/dummy/blog2'
    ]

    const blogs: Prisma.BlogCreateInput[] = [];
    for (let i = 0; i < 20; i++) {
        const random_image_index = Math.floor(Math.random() * images.length);
        blogs.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.sentence(),
            image: images[random_image_index] + '.png',
            image_md: images[random_image_index] + '_md.png',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    await prisma.blog.createMany({
        data: blogs,
    });
    console.log('\nSeed Finish: Blog');
}
