import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


export async function educationSeed(prisma: PrismaClient, userId: string) {
    const majors = [

        "Computer Science",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Biology",
        "Psychology",
        "Economics",
        // Add more majors as needed
    ];

    const degrees = [
        "Bachelor of Science",
        "Bachelor of Arts",
        "Master of Science",
        "Master of Arts",
        "Doctor of Philosophy (PhD)",
        // Add more degree names as needed
    ];


    function generateRandomDegree() {
        return degrees[Math.floor(Math.random() * degrees.length)];
    }

    function generateRandomMajor() {
        return majors[Math.floor(Math.random() * majors.length)];
    }

    for (let i = 0; i < 20; i++) {
        await prisma.education.createMany({
            data: [
                {
                    institution_name: faker.company.name() + " University",
                    major: generateRandomMajor(),
                    degree: generateRandomDegree(),
                    city: faker.location.city(),
                    startYear: faker.date.birthdate({ min: 2010, max: 2015 }).getFullYear(),
                    endYear: faker.date.birthdate({ min: 2015, max: 2020 }).getFullYear(),
                    userId,
                    createdAt: faker.date.past({ years: 10 }),
                    updatedAt: faker.date.recent()
                }
                //   {
                //     institution_name: "Mawaddah University",
                //     major: generateRandomMajor(),
                //     degree: "Bachelor",
                //     city: "Dhaka",
                //     startYear: 2010,
                //     endYear: 2014,
                //     createdAt: new Date(),
                //     updatedAt: new Date()
                //   },

            ],
        });

    }

    console.log('Seed: Education');
}
