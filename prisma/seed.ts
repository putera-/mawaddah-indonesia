import { PrismaClient } from '@prisma/client';
import { clientSeed } from './seed/client';
import { userSeed } from './seed/user';
import { gallerySeed } from './seed/gallery';
import { sliderSeed } from './seed/slider';
import { faqSeed } from './seed/faq';
import { memberSeed } from './seed/member';
import { provinceSeed } from './seed/province';
import { taaruf_goldSeed } from './seed/taaruf_gold';
import { bookmarksSeed } from './seed/bookmark';
import { taarufSeed } from './seed/taaruf';
import { familyMembersSeed } from './seed/family_members';
import { member_physical_character_seed } from './seed/member_physical_character';
const prisma = new PrismaClient();

async function main() {
    const clientid: string = '94de0914-cf51-47a4-8234-812824d9848a';
    const userId: string = '0766a4ea-ac7a-49b1-acca-49f3a4c24648';
    await clientSeed(prisma, clientid);
    await userSeed(prisma);
    await gallerySeed(prisma, clientid);
    await sliderSeed(prisma, clientid);
    await faqSeed(prisma, clientid);
    await provinceSeed(prisma);
    await memberSeed(prisma);
    await member_physical_character_seed(prisma);
    await taaruf_goldSeed(prisma);
    await bookmarksSeed(prisma);
    await taarufSeed(prisma);
    await familyMembersSeed(prisma);
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
