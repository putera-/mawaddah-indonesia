import { PrismaClient } from '@prisma/client';

export async function gallerytSeed(prisma: PrismaClient, clientId: string) {
    await prisma.gallery.createMany({
        data: [
            {
                clientId,
                title: 'Mawaddah Indonesia',
                photo: '/public/galleries/mawaddah.jpg',
            },
            {
                clientId,
                title: 'Mawaddah Indonesia Official',
                photo: '/public/galleries/mawaddah.jpg',
            }
        ],
    });

    console.log('Seed: Gallery');
}
