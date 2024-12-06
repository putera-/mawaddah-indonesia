import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

export async function blogs_seed(prisma: PrismaClient) {
    console.log('\nSeed Start: Blog');
    const blogs: Prisma.BlogCreateInput[] = [];
    for (let i = 0; i < 20; i++) {
        blogs.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.sentence(),
            image: faker.image.urlPicsumPhotos(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    await prisma.blog.createMany({
        data: blogs,
    });
    console.log('\nSeed Finish: Blog');
}
