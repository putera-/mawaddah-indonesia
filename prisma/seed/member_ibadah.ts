import { Cycle, Prisma, PrismaClient, ShalatFardu } from '@prisma/client';


export async function member_ibadah_seed(prisma: PrismaClient) {
    console.log('\nSeeder Start: Ibadah');

    const shalatFardu: ShalatFardu[] = [
        ShalatFardu.belum_pernah,
        ShalatFardu.bolong_bolong,
        ShalatFardu.kadang_di_masjid,
        ShalatFardu.pernah_sekali,
        ShalatFardu.rutin_di_masjid,
    ];

    const ibadahRawatib: Cycle[] = [
        Cycle.rutin,
        Cycle.belum_pernah,
        Cycle.kadang_kadang,
        Cycle.pernah_sekali,
    ];

    const biodata = await prisma.biodata.findMany({
        where: {
            user: {
                role: 'MEMBER',
            }
        }
    });


    for (let i = 0; i < biodata.length; i++) {
        process.stdout.write('.');
        const bio = biodata[i];

        const data: Prisma.IbadahCreateInput = {
            biodata: { connect: { id: bio.id } },
            shalat_fardu:
                shalatFardu[Math.floor(Math.random() * shalatFardu.length)],
            shalat_rawatib:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            shalat_dhuha:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            shalat_tahajud:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            puasa_ramadhan:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            puasa_senin_kamis:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            puasa_daud:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            puasa_ayamul_bid:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            zakat: ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
            ],
            sedekah:
                ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
                ],
            umrah: ibadahRawatib[
                Math.floor(Math.random() * ibadahRawatib.length)
            ],
            haji: Math.random() < 0.5
        };

        await prisma.ibadah.create({ data });
    }


    console.log('\nSeeder Finish: Ibadah')

}
