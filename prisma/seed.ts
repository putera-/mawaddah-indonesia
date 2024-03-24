import { PrismaClient } from '@prisma/client';
import { clientSeed } from './seed/client';
import { userSeed } from './seed/user';
import { gallerySeed } from './seed/gallery';
import { memberSeed } from './seed/member';
import { sliderSeed } from './seed/slider';
import { faqSeed } from './seed/faq';
import { provinceSeed } from './seed/province';
import { educationSeed } from './seed/education';
import { married_goalsSeed } from './seed/married_goals';
const prisma = new PrismaClient();

async function main() {
    const clientid: string = '94de0914-cf51-47a4-8234-812824d9848a';
    const userId: string = '0766a4ea-ac7a-49b1-acca-49f3a4c24648';
    await clientSeed(prisma, clientid);
    await userSeed(prisma);
    await gallerySeed(prisma, clientid);
    await memberSeed(prisma);
    await provinceSeed(prisma);
    await sliderSeed(prisma, clientid);
    await faqSeed(prisma, clientid);
    await educationSeed(prisma, userId);
    await married_goalsSeed(prisma, userId);

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
