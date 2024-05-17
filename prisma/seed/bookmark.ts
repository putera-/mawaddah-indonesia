import { PrismaClient } from '@prisma/client';

export async function bookmarksSeed(prisma: PrismaClient, numberOfBookmarks: number) {
    // Fetch users with the role 'MEMBER'
    const users = await prisma.user.findMany({
        where: {
            role: 'MEMBER'
        }
    });

    if (users.length < 2) {
        console.log('Not enough users to create bookmarks.');
        return;
    }

    for (let i = 0; i < numberOfBookmarks; i++) {
        // Randomly select a user
        const randomUser = Math.floor(Math.random() * users.length);
        const user = users[randomUser];

        // Randomly select a candidate that is not the same as the user
        let  candidateId: string;
        do {
            const randomCandidate = Math.floor(Math.random() * users.length);
            candidateId = users[randomCandidate].id;
        } while (candidateId === user.id);

        // Create a bookmark
        await prisma.bookmark.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                candidate: {
                    connect: {
                        id: candidateId
                    }
                }
            }
        });

    }
    console.log('Seed: Bookmarks');
}
