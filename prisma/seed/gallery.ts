import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function gallerySeed(prisma: PrismaClient, clientId: string) {
    for (let i = 0; i < 20; i++) {
        await prisma.gallery.createMany({
            data: [
                    {
                        clientId,
                        title: 'Mawaddah Indonesia',
                        photo: faker.image.urlPicsumPhotos(),
                    },
                    {
                        clientId,
                        title: 'Mawaddah Indonesia Official',
                        photo: faker.image.urlLoremFlickr(),
                    }
    
                ],
        });

    }

    console.log('Seed: Gallery');
}
