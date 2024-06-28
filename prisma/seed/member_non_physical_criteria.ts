import { MarriageStatus, Prisma, PrismaClient } from '@prisma/client';

export async function member_non_physical_criteria_seed(prisma: PrismaClient) {
    console.log('\nSeeder Start: Non Physical Criteria');
    const domiciles = await prisma.province.findMany();
    const educations = ['SMA', 'S1', 'S2', 'S3'];

    const marriedStatus: MarriageStatus[] = [
        MarriageStatus.CERAI_HIDUP,
        MarriageStatus.CERAI_MATI,
        MarriageStatus.LAJANG,
        MarriageStatus.MENIKAH,
    ];

    const sports: string[] = [
        'Sepak bola',
        'Bola basket',
        'Bola voli',
        'Tennis',
        'Badminton',
        'Golf',
        'Renang',
        'Lari',
        'Jalan cepat',
        'Berenang',
        'Mendaki gunung',
        'Bersepeda gunung',
        'Berlari marathon',
        'Bermain catur',
        'Bermain bridge',
        'Bermain futsal',
        'Bermain rugby',
        'Bermain softball',
        'Bermain baseball',
        'Bermain cricket',
        'Bermain squash',
        'Bermain tenis meja',
        'Bermain bulu tangkis',
        'Bermain panjat tebing',
        'Bermain ski',
        'Bermain snowboard',
        'Bermain selancar',
        'Bermain kayak',
        'Bermain dayung',
        'Bermain berenang indah',
        'Bermain senam',
        'Bermain gymnastik',
        'Bermain judo',
        'Bermain karate',
        'Bermain taekwondo',
        'Bermain kickboxing',
        'Bermain wushu',
        'Bermain silat',
        'Bermain kempo',
        'Bermain aikido',
        'Esports',
    ];

    const randomSports = Math.floor(Math.random() * sports.length);
    const randomSports2 = Math.floor(Math.random() * sports.length);

    const hobbies: string[] = [
        'Membaca buku',
        'Menulis cerita',
        'Menggambar',
        'Mendengarkan musik',
        'Berolahraga',
        'Bersepeda',
        'Mengaji Al-Quran',
        'Bermain musik',
        'Mengajar anak-anak',
        'Berkebun',
        'Memasak',
        'Berfoto',
        'Mengedit video',
        'Bermain game',
        'Mengikuti kursus online',
        'Mengembangkan aplikasi',
        'Mengikuti kompetisi',
        'Mengumpulkan koleksi',
        'Mengunjungi tempat wisata',
        'Mengikuti acara keagamaan',
        'Mengembangkan bisnis',
        'Mengikuti seminar',
        'Mengumpulkan buku',
        'Mengikuti pelatihan',
        'Mengembangkan kemampuan',
        'Mengikuti kegiatan sosial',
        'Mengumpulkan pengalaman',
        'Mengikuti kegiatan keagamaan',
        'Mengembangkan diri',
    ];

    const randomHobbies = Math.floor(Math.random() * hobbies.length);
    const randomHobbies2 = Math.floor(Math.random() * hobbies.length);

    const traits: string[] = [
        'Pemberani',
        'Ambisius',
        'Asli',
        'Berani',
        'Peduli',
        'Kharismatik',
        'Percaya Diri',
        'Kreatif',
        'Dedikasi',
        'Teguh',
        'Empati',
        'Enerjik',
        'Antusias',
        'Fleksibel',
        'Ramah',
        'Murah Hati',
        'Jujur',
        'Humoris',
        'Inovatif',
        'Menginspirasi',
        'Cerdas',
        'Baik',
        'Kepemimpinan',
        'Setia',
        'Termotivasi',
        'Optimis',
        'Terorganisasi',
        'Penuh Semangat',
        'Sabar',
        'Tekun',
        'Positif',
        'Proaktif',
        'Resilien',
        'Kreatif',
        'Santun',
        'Tidak Mementingkan Diri',
        'Tulus',
        'Supportif',
        'Berorientasi Tim',
        'Ulet',
        'Penuh Perhatian',
        'Visioner',
    ];

    const randomTraitIndex = Math.floor(Math.random() * traits.length);
    const randomTraitIndex1 = Math.floor(Math.random() * traits.length);
    const randomTraitIndex2 = Math.floor(Math.random() * traits.length);

    const sukuIndonesia: string[] = [
        'Aceh',
        'Batak',
        'Minangkabau',
        'Melayu',
        'Sunda',
        'Jawa',
        'Madura',
        'Betawi',
        'Bali',
        'Sasak',
        'Bugis',
        'Makassar',
        'Toraja',
        'Dayak',
        'Banjar',
        'Papua',
        'Ambon',
        'Flores',
        'Timor',
        'Sumbawa',
        'Nias',
        'Asmat',
        'Mentawai',
        'Tolaki',
        'Minahasa',
        'Sangir',
        'Bajau',
        'Torres Strait Islander',
    ];

    const job: string[] = [
        'Akuntan',
        'Arsitek',
        'Blogger',
        'Dokter',
        'Eksekutif',
        'Engineer',
        'Guru',
        'Ilmuwan',
        'Insinyur',
        'Jurnalis',
        'Konsultan',
        'Manager',
        'Marketing',
        'Matematikawan',
        'Pegawai Negeri',
        'Pengacara',
        'Pengembang',
        'Pengusaha',
        'Penulis',
        'Perawat',
        'Pilot',
        'Politikus',
        'Programmer',
        'Psikolog',
        'Sastrawan',
        'Seniman',
        'Teknisi',
        'Wartawan',
    ];

    const otherCriteria: string[] = [
        'Mencari seseorang yang dapat memahami dan mendukung kegiatan sosial saya',
        'Ingin berpasangan dengan seseorang yang memiliki kemampuan berempati dan peduli',
        'Menginginkan pasangan yang dapat menjadi partner dalam meningkatkan kualitas hidup',
        'Mencari seseorang yang dapat memahami dan menghargai perbedaan latar belakang',
        'Ingin berpasangan dengan seseorang yang memiliki kemampuan berkomunikasi yang efektif',
        'Menginginkan pasangan yang dapat menjadi teman dalam berbagai kesempatan dan tantangan',
        'Mencari seseorang yang dapat memahami dan mendukung cita-cita dan tujuan hidup saya',
        'Ingin berpasangan dengan seseorang yang memiliki kemampuan memecahkan masalah dengan bijak',
        'Menginginkan pasangan yang dapat menjadi partner dalam meningkatkan kesadaran dan kepedulian sosial',
        'Mencari seseorang yang dapat memahami dan menghargai nilai-nilai keluarga saya',
        'Ingin berpasangan dengan seseorang yang memiliki kemampuan beradaptasi dan fleksibel',
        'Menginginkan pasangan yang dapat menjadi teman dalam berbagai aktivitas dan hobi',
        'Mencari seseorang yang dapat memahami dan mendukung kebutuhan dan keinginan saya',
        'Ingin berpasangan dengan seseorang yang memiliki kemampuan memimpin dan menginspirasi',
        'Menginginkan pasangan yang dapat menjadi partner dalam meningkatkan kualitas ibadah',
        'Mencari seseorang yang dapat memahami dan menghargai perbedaan pendapat dan pandangan',
        'Ingin berpasangan dengan seseorang yang memiliki kemampuan berbicara dan berdiskusi dengan baik',
        'Menginginkan pasangan yang dapat menjadi teman dalam berbagai kesempatan dan situasi',
        'Mencari seseorang yang dapat memahami dan mendukung kegiatan dan hobi saya',
        'Ingin berpasangan dengan seseorang yang memiliki kemampuan memecahkan konflik dengan bijak',
    ];

    const randomOtherIndex = Math.floor(Math.random() * otherCriteria.length);
    const randomOtherIndex1 = Math.floor(Math.random() * otherCriteria.length);
    const randomOtherIndex2 = Math.floor(Math.random() * otherCriteria.length);

    const biodata = await prisma.biodata.findMany({
        where: {
            user: {
                role: 'MEMBER',
            },
        },
    });

    for (let i = 0; i < biodata.length; i++) {
        process.stdout.write('.');
        const bio = biodata[i];

        const data: Prisma.NonPhysicalCriteriaCreateInput = {
            biodata: { connect: { id: bio.id } },
            age: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
            domicile:
                domiciles[Math.floor(Math.random() * domiciles.length)].name,
            education:
                educations[Math.floor(Math.random() * educations.length)],
            married_status:
                marriedStatus[Math.floor(Math.random() * marriedStatus.length)],
            sport: `${sports[randomSports]}, ${sports[randomSports2]}`,
            hobby: `${hobbies[randomHobbies]}, ${hobbies[randomHobbies2]}`,
            traits: `${traits[randomTraitIndex]}, ${traits[randomTraitIndex1]}, ${traits[randomTraitIndex2]}`,
            ethnic: sukuIndonesia[
                Math.floor(Math.random() * sukuIndonesia.length)
            ],
            job: job[Math.floor(Math.random() * job.length)],
            other: `${otherCriteria[randomOtherIndex]}, ${otherCriteria[randomOtherIndex1]}, ${otherCriteria[randomOtherIndex2]}`,
        };
        await prisma.nonPhysicalCriteria.create({
            data,
        });
    }
    console.log('\nSeeder Finish: Non Physical Criteria');
}
