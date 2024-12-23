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
import { familyMembersSeed } from './seed/member_family';
import { member_physical_character_seed } from './seed/member_physical_character_n_criteria';
import { member_ibadah_seed } from './seed/member_ibadah';
import { member_non_physical_criteria_seed } from './seed/member_non_physical_criteria';
import { member_life_goals_seed } from './seed/member_life_goals';
import { questionSeeder } from './seed/question';
import { answerSeed } from './seed/answer';
import { experience } from './seed/experience';
import { LandingPageSeed } from './seed/landing_page';
import { blogs_seed } from './seed/blogs';
const prisma = new PrismaClient();

async function main() {
    const clientid: string = '94de0914-cf51-47a4-8234-812824d9848a';
    const userId: string = '0766a4ea-ac7a-49b1-acca-49f3a4c24648';
    await clientSeed(prisma, clientid);
    await blogs_seed(prisma)
    await userSeed(prisma);
    await questionSeeder(prisma);
    await gallerySeed(prisma, clientid);
    await sliderSeed(prisma, clientid);
    await faqSeed(prisma, clientid);
    await LandingPageSeed(prisma);
    await provinceSeed(prisma);
    await memberSeed(prisma);
    await member_physical_character_seed(prisma);
    await member_ibadah_seed(prisma);
    await member_non_physical_criteria_seed(prisma);
    await taaruf_goldSeed(prisma);
    await bookmarksSeed(prisma);
    await taarufSeed(prisma);
    await familyMembersSeed(prisma);
    await member_life_goals_seed(prisma);
    await answerSeed(prisma);
    await experience(prisma);
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
