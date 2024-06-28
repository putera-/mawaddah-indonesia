import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

export async function member_life_goals_seed(prisma: PrismaClient) {
    console.log('\nSeeder Start: Life Goals')


    const financial_arrangement = faker.helpers.arrayElement([
        'suami',
        'istri',
        'belum ditentukan'
    ]);
    const knowledge_upgrade = faker.helpers.arrayElement([
        'Memanah',
        'Memasak',
        'Berkuda',
        'Menjahit',
        'Bertani',
        'Menulis',
        'Membaca',
        'Berbicara di depan umum',
        'Memancing',
        'Menyelam',
        'Menyanyi',
        'Menari',
        'Melukis',
        'Menggambar',
        'Memahat',
        'Merancang',
        'Membuat kerajinan tangan',
        'Mengemudi',
        'Merawat hewan',
        'Berkebun',
        'Menyelesaikan masalah',
        'Berpikir kritis',
        'Komunikasi interpersonal',
        'Kepemimpinan',
        'Kerja tim',
        'Manajemen waktu',
        'Adaptabilitas',
        'Pemrograman komputer',
        'Analisis data',
        'Desain grafis',
        'Fotografi',
        'Videografi',
        'Pemasaran digital',
        'SEO',
        'Manajemen proyek',
        'Negosiasi',
        'Menyusun strategi',
        'Pengelolaan keuangan',
        'Pelayanan pelanggan',
        'Konseling',
        'Psikologi',
        'Mengajar',
        'Bahasa asing',
        'Jurnalisme',
        'Penelitian',
        'Musik',
        'Drama',
        'Olahraga',
        'Yoga',
        'Meditasi'
    ])

    const short_term_achievement = faker.helpers.arrayElement([
        'Berhasil mendapatkan promosi di karir',
        'Berhasil menyelesaikan proyek besar',
        'Berhasil mencapai omset 1 milyar',
        'Menyelesaikan kursus bahasa asing',
        'Membeli rumah pertama',
        'Menabung untuk liburan besar',
        'Menyelesaikan marathon pertama',
        'Menjalin hubungan baru yang bermakna',
        'Mendapatkan sertifikasi profesional',
        'Mengurangi berat badan sesuai target'
    ]);

    const long_term_achievement = faker.helpers.arrayElement([
        'Dapat mengendalikan emosi lebih baik',
        'Membangun bisnis yang sukses',
        'Mencapai kemandirian finansial',
        'Memiliki keluarga yang harmonis',
        'Menjadi ahli dalam bidang profesional',
        'Berpartisipasi dalam kegiatan sosial secara rutin',
        'Memiliki portofolio investasi yang kuat',
        'Menulis dan menerbitkan buku',
        'Memiliki kesehatan fisik dan mental yang prima',
        'Meninggalkan warisan yang berarti untuk generasi berikutnya'
    ]);

    const wife_work_permit = faker.helpers.arrayElement([true, false]);
    const wife_work_permit_desc = faker.helpers.arrayElement([
        'boleh',
        'tidak boleh',
        'belum dibicarakan',
    ]);

    let child_count = faker.number.int({ min: 0, max: 10 });
    const child_count_string = child_count.toString();

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

        const data: Prisma.LifeGoalCreateInput = {
            career: faker.person.jobTitle(),
            domicile: faker.location.city(),
            child_count: child_count_string,
            child_education: faker.person.jobTitle(),
            financial_arrangement: financial_arrangement,
            knowledge_upgrade: knowledge_upgrade,
            short_term_achievement: short_term_achievement,
            long_term_achievement: long_term_achievement,
            wife_work_permit: wife_work_permit,
            wife_work_permit_desc: wife_work_permit_desc,
            biodata: { connect: { id: bio.id } }
        };
        await prisma.lifeGoal.create({
            data
        })
    }

    console.log('\nSeeder Finish: Life Goals')

}
