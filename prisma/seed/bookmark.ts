import { PrismaClient } from '@prisma/client';

export async function bookmarksSeed(prisma: PrismaClient) {
    // Fetch users with the role 'MEMBER'
    const users = await prisma.user.findMany({
        where: {
            role: 'MEMBER',
        },
        include: {
            biodata: true,
        },
    });

    for (let i = 0; i < users.length; i++) {
        process.stdout.write('.');
        //user yang akan melakukan bookmark
        const user = users[i];
        if (!user.biodata) continue;

        //filter user yang berbeda kelamin
        const candidates = users.filter((u) => {
            if (u.biodata) return u.biodata.gender != user.biodata.gender;
        });

        const randomMaxBookmarks = Math.floor(Math.random() * 20);

        //bookmark user randomly maks 20 users dari user yabg sudah di filter jenis kelaminnya
        for (let i = 0; i < randomMaxBookmarks; i++) {
            const randomCandidateIndex = Math.floor(
                Math.random() * candidates.length,
            );
            const randomCandidate = candidates[i];

            // Create bookmarks
            await prisma.bookmark.create({
                
                data: {
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                    candidate: {
                        connect: {
                            id: randomCandidate.id,
                        },
                    },
                },
            });
        }
    }
    console.log('Seed: Bookmarks');
}
