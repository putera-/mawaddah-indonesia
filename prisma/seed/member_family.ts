import { PrismaClient, relationship, religion } from '@prisma/client';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';


export async function familyMembersSeed(prisma: PrismaClient) {
    console.log('\nSeeder Start: Family Members')

    const biodata = await prisma.biodata.findMany({
        where: {
            user: {
                role: 'MEMBER',
            }
        }
    });

    // const selectedBiodata = [];
    // for (let i = 0; i < 100; i++) {
    //     if (i % 2 == 0) selectedBiodata.push(i);
    // }

    const relations: relationship[] = [
        relationship.ayah,
        relationship.ibu,
        relationship.ipar_pria,
        relationship.ipar_wanita,
        relationship.adik_pria,
        relationship.adik_wanita,
        relationship.kakak_wanita,
        relationship.kakak_pria,
        relationship.anak_kandung,
        relationship.anak_angkat
    ];

    const religions: religion[] = [
        religion.islam,
        religion.non_islam
    ]

    const jobs: string[] = [
        'Pengangguran',
        'Pegawai Swasta',
        'Pegawai Negeri',
        'Polisi',
        'Petani',
        'Pengacara',
        'Dokter',
        'Wiraswasta',
        'Manager Butik',
    ]

    const education: string[] = [
        'SD',
        'SMP',
        'SMA',
        'D1',
        'D2',
        'D3',
        'D4',
        'S1',
        'S2',
        'S3',
    ]

    const is_alive: boolean[] = [
        true,
        false
    ]

    for (let i = 0; i < biodata.length; i++) {
        process.stdout.write('.');
        // if (selectedBiodata.indexOf(i) != -1) {
        const bio = biodata[i];
        for (let i = 0; i < Math.floor(Math.random() * relations.length); i++) {
            const dob = faker.date.birthdate({ min: 1940, max: 2014, mode: 'year' });
            await prisma.familyMember.create({
                data: {
                    relationship: faker.helpers.arrayElement(relations),
                    religion: faker.helpers.arrayElement(religions),
                    dob: dayjs(dob).format('YYYY-MM-DD'),
                    job: faker.helpers.arrayElement(jobs),
                    education: faker.helpers.arrayElement(education),
                    is_alive: faker.helpers.arrayElement(is_alive),
                    Biodata: {
                        connect: {
                            id: bio.id
                        }
                    }
                }
            })
        }
        // }
    }


    console.log('\nSeeder Finish: Family Members')

}
