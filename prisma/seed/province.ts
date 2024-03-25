import { PrismaClient } from '@prisma/client';

export async function provinceSeed(prisma: PrismaClient) {
    const provinces = [
        'Nanggroe Aceh Darussalam',
        'Sumatera Utara',
        'Sumatera Barat',
        'Riau',
        'Kepulauan Riau',
        'Jambi',
        'Bengkulu',
        'Sumatera Selatan',
        'Lampung',
        'Bangka Belitung',
        'Banten',
        'Jakarta',
        'Jawa Barat',
        'Jawa Tengah',
        'DI Yogyakarta',
        'Jawa Timur',
        'Kalimantan Barat',
        'Kalimantan Tengah',
        'Kalimantan Selatan',
        'Kalimantan Timur',
        'Kalimantan Utara',
        'Bali',
        'Nusa Tenggara Barat',
        'Nusa Tenggara Timur',
        'Gorontalo',
        'Sulawesi Barat',
        'Sulawesi Selatan',
        'Sulawesi Tengah',
        'Sulawesi Utara',
        'Sulawesi Tenggara',
        'Maluku',
        'Maluku Utara',
        'Papua Barat',
        'Papua',
        'Papua Tengah',
        'Papua Pegunungan',
        'Papua Selatan',
        'Papua Barat Daya',
    ];
    for (const name of provinces) {
        await prisma.province.upsert({
            where: { name: name },
            create: {
                name: name,
            },
            update: {
                name: name,
            },
        });
    }

    console.log('Seed: Province');
}
