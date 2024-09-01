import { ExperienceType, Prisma, PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { Biodata } from "src/biodata/biodata.interface";

export async function experience(prisma: PrismaClient) {
    console.log('\nSeeder Start: Experiences')

    const biodatas = await prisma.biodata.findMany({
        where: {
            user: {
                role: 'MEMBER',
            }
        }
    });

    const types: ExperienceType[] = [
        ExperienceType.Kerja,
        ExperienceType.Organisasi
    ];

    const jobRoles = [
        'Software Engineer',
        'Data Analyst',
        'Product Manager',
        'UX Designer',
        'Marketing Specialist',
        'Sales Representative',
        'Human Resources Manager',
        'Financial Analyst',
        'Operations Coordinator',
        'Customer Support Specialist'
    ];



    for (const biodata of biodatas) {
        const biodataId = biodata.id;

        for (let i = 0; i < Math.floor(Math.random() * 12); i++) {
            process.stdout.write('.');
            const experience: Prisma.ExperienceCreateInput = {
                biodata: { connect: { id: biodataId } },
                type: types[Math.floor(Math.random() * types.length)],
                start_year: faker.date.past().getFullYear(),
                end_year: faker.date.recent().getFullYear(),
                position: jobRoles[Math.floor(Math.random() * jobRoles.length)],
                description: faker.lorem.paragraphs(3),
            }

            await prisma.experience.create({ data: experience });
        }
    }

    console.log('\nSeeder Finish: Experiences')

}
