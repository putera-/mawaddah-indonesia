import { PrismaClient } from '@prisma/client';

export async function provinceSeed(prisma: PrismaClient) {
    const provinces = [
        'nanggroe aceh darussalam',
        'sumatera utara',
        'sumatera barat',
        'riau',
        'kepulauan riau',
        'jambi',
        'bengkulu',
        'sumatera selatan',
        'lampung',
        'bangka belitung',
        'banten',
        'jakarta',
        'jawa barat',
        'jawa tengah',
        'di yogyakarta',
        'jawa timur',
        'kalimantan barat',
        'kalimantan tengah',
        'kalimantan selatan',
        'kalimantan timur',
        'kalimantan utara',
        'bali',
        'nusa tenggara barat',
        'nusa tenggara timur',
        'gorontalo',
        'sulawesi barat',
        'sulawesi selatan',
        'sulawesi tengah',
        'sulawesi utara',
        'sulawesi tenggara',
        'maluku',
        'maluku utara',
        'papua barat',
        'papua',
        'papua tengah',
        'papua pegunungan',
        'papua selatan',
        'papua barat daya',
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
