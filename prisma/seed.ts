import { PrismaClient } from '@prisma/client';
import { clientSeed } from './seed/client';
import { userSeed } from './seed/user';
import { gallerySeed } from './seed/gallery';
const prisma = new PrismaClient()

async function main() {
    const clientid: string = '94de0914-cf51-47a4-8234-812824d9848a';
    await clientSeed(prisma, clientid);
    await userSeed(prisma);
    await gallerySeed(prisma, clientid);
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
