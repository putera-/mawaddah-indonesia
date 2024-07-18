import { faker } from '@faker-js/faker';

import {
    Cycle,
    ManhajStatus,
    MarriagePermission,
    MarriagePreparation,
    MarriageStatus,
    Prisma,
    PrismaClient,
    ShalatFardu,
    body_shape,
    eye_Color,
    hair_color,
    hair_type,
    skin_color,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function memberSeed(prisma: PrismaClient) {
    console.log('\nSeed Start: Member');

    const password = await bcrypt.hash('rahasia', 10);
    const provinces = await prisma.province.findMany();

    const biography = [
        'Saya adalah seorang profesional di bidang teknologi informasi dengan pengalaman lebih dari 15 tahun. Karier saya dimulai sebagai seorang teknisi jaringan di perusahaan telekomunikasi terkemuka di Indonesia. Dari sana, saya belajar banyak tentang infrastruktur IT dan keamanan jaringan. Selama bertahun-tahun, saya telah berkembang menjadi seorang arsitek solusi IT dengan keahlian dalam merancang dan mengimplementasikan infrastruktur IT yang kompleks untuk organisasi besar. Saat ini, saya memimpin tim teknologi di sebuah perusahaan multinasional di mana saya bertanggung jawab atas strategi teknologi dan transformasi digital.',
        'Pendidikan saya dimulai di universitas terkemuka di negara saya, di mana saya mengambil jurusan Teknik Informatika. Selama di perguruan tinggi, saya aktif dalam berbagai kegiatan akademis dan penelitian. Saya juga menjadi anggota dari beberapa organisasi mahasiswa yang membantu saya memperluas pengetahuan dan keterampilan saya di luar kurikulum. Saya lulus dengan gelar sarjana dengan penghargaan tertinggi dan kemudian melanjutkan untuk mendapatkan gelar magister dalam Manajemen Teknologi Informasi.',
        'Di samping karier profesional saya, saya memiliki minat yang besar dalam pengajaran dan pendidikan. Saya telah menjadi pembicara di berbagai konferensi teknologi dan menyampaikan kuliah tamu di universitas lokal. Saya juga aktif sebagai mentor bagi para profesional muda di industri IT, membimbing mereka dalam pengembangan karier dan keahlian teknis. Saya percaya bahwa berbagi pengetahuan adalah kunci untuk mendorong inovasi dan pertumbuhan di komunitas teknologi.',
        'Dalam hidup pribadi, saya adalah seorang pecinta alam dan petualang. Saya sering menghabiskan waktu luang saya untuk mendaki gunung dan menjelajahi tempat-tempat alam yang indah. Hobi ini membantu saya menjaga keseimbangan dan kedamaian dalam hidup yang sering kali sibuk. Selain itu, saya juga memiliki minat dalam seni dan fotografi. Saya menemukan bahwa fotografi adalah cara yang baik untuk mengekspresikan kreativitas dan mengabadikan momen-momen berharga dalam hidup.',
        'Visi saya adalah untuk terus berkembang sebagai seorang profesional yang memberikan dampak positif dalam industri teknologi. Saya berkomitmen untuk terus belajar tentang teknologi terbaru dan berinovasi dalam menciptakan solusi yang bermanfaat bagi masyarakat dan lingkungan sekitar. Saya percaya bahwa dengan dedikasi dan kerja keras, kita dapat mencapai tujuan-tujuan besar dalam hidup dan memberikan kontribusi yang berarti bagi dunia.',
        'Dalam perjalanan hidup saya, saya telah menghadapi banyak tantangan dan rintangan. Namun, saya percaya bahwa setiap tantangan adalah kesempatan untuk tumbuh dan belajar. Saya bersyukur atas dukungan dari keluarga, teman-teman, dan mentor yang selalu mendukung dan memotivasi saya dalam setiap langkah perjalanan saya. Pengalaman-pengalaman ini telah membentuk saya menjadi pribadi yang tangguh dan bersemangat untuk menghadapi masa depan yang cerah.',
        'Saya selalu berusaha untuk hidup dengan integritas dan nilai-nilai yang kuat. Saya percaya bahwa integritas adalah pondasi dari segala hubungan yang baik, baik dalam konteks profesional maupun pribadi. Saya juga menghargai kolaborasi dan tim kerja yang efektif, di mana setiap anggota tim memiliki peran penting dalam mencapai tujuan bersama. Saya senang bekerja dalam lingkungan yang dinamis dan menantang di mana saya dapat terus berkembang dan memberikan kontribusi yang signifikan.',
        'Kesimpulannya, saya adalah seseorang yang bersemangat dalam menjalani hidup dengan penuh dedikasi dan komitmen untuk memberikan yang terbaik dalam setiap aspek kehidupan saya. Saya yakin bahwa dengan semangat yang tinggi dan tekad yang kuat, kita dapat mencapai impian kita dan membawa perubahan positif bagi dunia di sekitar kita.',
        'Saya telah belajar banyak dalam perjalanan hidup saya, terutama dalam konteks pengembangan pribadi dan profesional. Saya memulai karier saya sebagai seorang pengembang perangkat lunak dengan mengejar gelar teknik informatika dari universitas terkemuka. Selama belajar di perguruan tinggi, saya aktif dalam berbagai kegiatan ekstrakurikuler dan organisasi mahasiswa, yang membantu saya memperluas jaringan dan keterampilan interpersonal saya. Setelah lulus, saya bergabung dengan sebuah perusahaan teknologi global di mana saya belajar tentang pengembangan perangkat lunak skala besar dan manajemen proyek.',
        'Sejak saat itu, saya telah mengambil peran yang berbeda-beda dalam industri IT, termasuk sebagai arsitek solusi dan manajer produk. Pada titik tertentu dalam karier saya, saya memutuskan untuk memulai perusahaan saya sendiri, fokus pada konsultasi IT untuk startup dan perusahaan kecil menengah. Pengalaman ini mengajarkan saya tentang kewirausahaan, manajemen bisnis, dan tantangan-tantangan yang terkait dengan membangun dan mempertahankan bisnis di pasar yang kompetitif.',
        'Di samping karier dan bisnis, saya adalah seorang penggila teknologi yang selalu ingin mengikuti perkembangan terbaru dalam industri IT. Saya aktif dalam komunitas teknologi lokal dan sering berpartisipasi dalam acara-acara industri, baik sebagai peserta maupun pembicara. Saya juga menyukai pembelajaran kontinu dan terus meningkatkan keterampilan teknis saya melalui kursus online dan sertifikasi terkait.',
        'Pendidikan adalah salah satu nilai yang saya pegang teguh. Saya percaya bahwa pendidikan bukan hanya tentang memperoleh gelar atau sertifikasi, tetapi juga tentang proses belajar sepanjang hidup. Saya terus mencari peluang untuk belajar hal-hal baru, baik dalam konteks profesional maupun pribadi. Saya percaya bahwa dengan pengetahuan yang mendalam dan keterampilan yang terus diperbarui, saya dapat memberikan nilai tambah yang signifikan dalam setiap peran yang saya ambil.',
        'Selain dari dunia teknologi, saya memiliki minat dalam seni dan musik. Saya adalah seorang pecinta musik sejak kecil dan belajar bermain alat musik sejak usia dini. Saya menemukan bahwa musik adalah pelarian yang sempurna dari rutinitas sehari-hari dan memberikan saya inspirasi kreatif. Selain itu, saya juga senang berkeliling dan menjelajahi tempat-tempat baru. Saya percaya bahwa perjalanan adalah investasi terbaik untuk memperluas wawasan dan menghargai keanekaragaman budaya di dunia ini.',
        'Pada akhirnya, saya berusaha untuk menjalani kehidupan yang seimbang antara karier, keluarga, dan kegiatan pribadi. Saya percaya bahwa keseimbangan ini adalah kunci untuk kebahagiaan dan keberhasilan jangka panjang. Saya berkomitmen untuk terus berinovasi dan menciptakan dampak positif di dunia sekitar saya, baik melalui pekerjaan saya maupun melalui kegiatan sosial dan sukarelawanisme.',
    ];

    const mottos: string[] = [
        'ah perubahan yang ingin kamu lihat di dunia.',
        'Hidup adalah perjalanan, nikmati setiap langkahnya.',
        'Belajar dari masa lalu, hidup di masa kini, dan harapkan masa depan.',
        'Kegagalan adalah langkah menuju kesuksesan.',
        'Selalu berbuat baik, karena kebaikan akan kembali padamu.',
        'Hidup ini singkat, jadi buatlah setiap hari berarti.',
        'Keberanian adalah kunci untuk membuka pintu peluang.',
        'Kebahagiaan adalah pilihan, bukan tujuan.',
        'Usaha keras tidak pernah mengkhianati hasil.',
        'Jadilah dirimu sendiri, semua orang lain sudah ada yang memiliki.',
    ];

    const life_goals: string[] = [
        'Tujuan hidup saya adalah mencapai keseimbangan antara karier dan kehidupan pribadi',
        'Saya bercita-cita untuk mendirikan bisnis sendiri dan memberikan lapangan kerja bagi orang lain',
        'Saya ingin terus belajar dan mengembangkan diri agar bisa menjadi ahli di bidang saya',
        'Tujuan hidup saya adalah membangun keluarga yang bahagia dan harmonis',
        'Saya ingin berkontribusi pada masyarakat dengan melakukan kegiatan sukarelawan',
        'Tujuan saya adalah mengejar kebahagiaan sejati dan hidup dengan penuh makna',
    ];

    const hobbies: string[] = [
        'membaca',
        'menonton',
        'menyanyi',
        'menonton film',
        'menonton anime',
        'menonton game',
        'mengaji',
        'menggambar',
    ];

    const spare_time_activities: string[] = [
        'Saat waktu luang, saya suka menghabiskannya dengan berjalan-jalan di taman.',
        'Di waktu luang, saya sering mendengarkan musik atau bermain alat musik.',
        'Ketika memiliki waktu luang, saya senang memasak dan mencoba resep-resep baru.',
        'Pada waktu luang, saya suka menonton film atau serial televisi favorit.',
        'Ketika memiliki waktu luang, saya sering menghabiskan waktu luang di tempat-tempat yang nyaman.',
        'Di waktu luang, saya sering bermain game dan bermain permainan komputer.',
    ];

    const positive_traits: string[] = [
        'Saya orangnya jujur dan pemaaf.',
        'Saya sangat pintar dan suka berpikir positif.',
        'Saya dikenal sebagai orang yang sabar dan penuh pengertian.',
        'Saya selalu berusaha untuk menjadi orang yang ramah dan mudah bergaul',
        'Saya orangnya pekerja keras dan bertanggung jawab',
        'Saya selalu berusaha untuk menjadi orang yang setia dan dapat diandalkan',
    ];

    const negative_traits: string[] = [
        'Saya orangnya sering terburu-buru dan kurang sabar',
        'Saya cenderung keras kepala dan sulit menerima pendapat orang lain',
        'Saya sering merasa iri hati terhadap kesuksesan orang lain',
        'Saya orangnya mudah marah dan emosional',
        'Saya sering menunda-nunda pekerjaan dan sulit menjaga disiplin',
        'Saya kadang-kadang terlalu pesimis dan sulit melihat sisi positif dari situasi',
    ];

    const liked_things: string[] = [
        'Saya suka membaca buku, terutama novel fiksi dan biografi',
        'Saya sangat menikmati berjalan-jalan di alam dan menjelajahi tempat-tempat baru',
        'Saya suka memasak dan mencoba resep-resep baru di waktu luang',
        'Saya menikmati bermain olahraga seperti sepak bola dan bulu tangkis',
        'Saya suka menonton film, terutama film-film dokumenter dan drama',
        'Saya suka berkebun dan merawat tanaman di halaman rumah',
    ];

    const unliked_things: string[] = [
        'Saya tidak suka menunggu terlalu lama, terutama dalam antrean yang panjang',
        'Saya kurang menyukai makanan yang terlalu pedas',
        'Saya tidak suka dengan kebisingan yang berlebihan, terutama saat mencoba untuk fokus',
        'Saya tidak suka menonton film yang terlalu panjang',
        'Saya tidak nyaman berada di tempat yang terlalu ramai dan padat',
        'Saya tidak suka dengan orang yang suka menggosip atau membicarakan orang lain di belakang mereka',
    ];
    ('Saya tidak suka dengan orang yang suka menggosip atau membicarakan orang lain di belakang mereka');

    const sukuIndonesia = [
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

    const visi2: string[] = [
        'Menjadi individu yang berkarakter dan berintegritas.',
        'Menjadi teladan dalam kehidupan bermasyarakat.',
        'Mencapai keseimbangan antara karir dan kehidupan pribadi.',
        'Menjadi inspirasi bagi generasi muda.',
        'Mengembangkan potensi diri secara maksimal.',
        'Menjadi sumber kebahagiaan bagi keluarga dan orang-orang terdekat.',
        'Menjalani hidup dengan penuh makna dan tujuan.',
        'Menjadi pemimpin yang bijaksana dan adil.',
        'Menciptakan kehidupan yang seimbang dan harmonis.',
        'Menjadi individu yang berkontribusi positif bagi lingkungan.',
        'Membangun keluarga yang harmonis dan bahagia.',
        'Menjadi pasangan yang saling mendukung dan menghargai.',
        'Menciptakan rumah tangga yang penuh cinta dan kasih sayang.',
        'Menjadi contoh positif bagi anak-anak dan masyarakat.',
        'Membangun keluarga yang kuat dalam iman dan nilai-nilai kebaikan.',
        'Mencapai keseimbangan antara kehidupan keluarga dan karir.',
        'Membangun kehidupan bersama yang sejahtera dan berkecukupan.',
        'Menjadi pasangan yang selalu bersama dalam suka dan duka.',
        'Mewujudkan keluarga yang selalu bersyukur dan berterima kasih.',
        'Menjalani kehidupan pernikahan yang penuh makna dan kebahagiaan.',
    ];
    const misi2: string[] = [
        'Selalu belajar dan mengembangkan diri melalui pendidikan dan pengalaman.',
        'Menjaga hubungan baik dengan keluarga, teman, dan rekan kerja.',
        'Menghadapi setiap tantangan dengan sikap positif dan semangat juang.',
        'Mendukung dan memotivasi orang lain untuk mencapai potensi terbaik mereka.',
        'Menjalani gaya hidup sehat dan aktif.',
        'Mengelola waktu dengan bijaksana untuk mencapai keseimbangan hidup.',
        'Berpartisipasi aktif dalam kegiatan sosial dan kemasyarakatan.',
        'Menjalankan prinsip-prinsip moral dan etika dalam setiap tindakan.',
        'Membangun karir yang sukses dan bermakna.',
        'Menghargai dan menikmati setiap momen dalam hidup.',
        'Membina komunikasi yang terbuka dan jujur dengan pasangan.',
        'Selalu memberikan dukungan emosional dan moral satu sama lain.',
        'Menghormati perbedaan dan mencari solusi bersama dalam setiap permasalahan.',
        'Menjaga komitmen dan kesetiaan dalam hubungan pernikahan.',
        'Menciptakan waktu berkualitas untuk keluarga dan pasangan.',
        'Mengajarkan dan menanamkan nilai-nilai moral kepada anak-anak.',
        'Bekerja sama dalam mencapai tujuan bersama dan pribadi.',
        'Menjalankan tanggung jawab rumah tangga dengan adil dan seimbang.',
        'Selalu berusaha untuk memperbaiki diri dan hubungan pernikahan.',
        'Menghargai setiap kontribusi dan usaha pasangan dalam kehidupan sehari-hari.',
    ];

    const mental2: string[] = [
        'Siap',
        'Ragu-ragu',
        'Tidak siap',
        'Sangat siap',
        'Cemas',
        'Optimis',
        'Pesimis',
        'Bersemangat',
        'Tenang',
        'Gelisah',
        'Percaya diri',
        'Takut',
        'Bingung',
        'Tertekan',
        'Santai',
        'Penuh harapan',
        'Kecewa',
        'Bahagia',
        'Fokus',
        'Tidak fokus',
        'Berani',
        'Malas',
        'Termotivasi',
        'Tidak termotivasi',
        'Berduka',
        'Tegas',
        'Tidak tegas',
        'Yakin',
        'Bimbang',
        'Terbuka',
        'Tertutup',
        'Stres',
        'Euforia',
        'Apatis',
        'Khawatir',
        'Puas',
        'Lelah',
        'Semangat tinggi',
        'Putus asa',
        'Siap menghadapi tantangan',
    ];

    const mahar2: string[] = [
        'Emas 50 gram',
        'Uang tunai Rp 10.000.000',
        'Perhiasan berlian',
        'Rumah',
        'Mobil',
        'Emas 100 gram',
        'Al-Quran dan seperangkat alat sholat',
        'Tanah 1 hektar',
        'Perhiasan emas',
        'Uang tunai Rp 5.000.000',
        'Emas 25 gram',
        'Uang tunai Rp 20.000.000',
        'Sepasang kalung dan cincin',
        'Motor',
        'Emas 200 gram',
        'Uang tunai Rp 50.000.000',
        'Sapi',
        'Kambing 5 ekor',
        'Perlengkapan rumah tangga',
        'Emas 75 gram',
    ];

    const span_times: string[] = [
        '1 bulan',
        '2 bulan',
        '3 bulan',
        '4 bulan',
        '5 bulan',
        '6 bulan',
        '7 bulan',
        '8 bulan',
        '9 bulan',
        '10 bulan',
        '11 bulan',
        '12 bulan',
        '1 tahun',
        '2 tahun',
        '3 tahun',
        '4 tahun',
        '5 tahun',
        '6 tahun',
        '7 tahun',
        '8 tahun',
        '9 tahun',
        '10 tahun',
    ];

    let cost = Math.floor(Math.random() * 10000000) + 1000000;
    const costString = `${cost}`;

    const manhaj: ManhajStatus[] = [
        ManhajStatus.BARU_BELAJAR,
        ManhajStatus.NON_SALAF,
        ManhajStatus.SALAF,
    ];

    const marriedStatus: MarriageStatus[] = [
        MarriageStatus.CERAI_HIDUP,
        MarriageStatus.CERAI_MATI,
        MarriageStatus.LAJANG,
        MarriageStatus.MENIKAH,
    ];

    const marriagePermissions: MarriagePermission[] = [
        MarriagePermission.NON_POLIGAMI,
        MarriagePermission.POLIGAMI,
    ];

    const poligamiOpinions = [
        'Saya sangat suka dengan poligami',
        'Yang pasti hukum Islam tidak melarang poligami secara mutlak (haram) dan juga tidak menganjurkan secara mutlak (wajib).',
        'Menurutku poligami itu sah-sah aja asal tujuan dan caranya baik-baik',
        'Saya kurang suka dengan poligami',
        'Saya tidak suka dengan poligami',
        'Poligami itu tanda tidak setia dan tidak cinta',
    ];

    const skillSet = [
        { title: 'Saya adalah seorang programmer' },
        {
            title: 'Saya bisa berbicara dalam tiga bahasa: Indonesia, Inggris, dan Mandarin',
        },
        {
            title: 'Saya ahli dalam pengembangan aplikasi web dengan React dan Node.js',
        },
        {
            title: 'Saya memiliki pengalaman dalam analisis data menggunakan Python',
        },
        {
            title: 'Saya terampil dalam desain grafis menggunakan Adobe Photoshop dan Illustrator',
        },
        {
            title: 'Saya bisa mengelola server dan deployment menggunakan Docker dan Kubernetes',
        },
        {
            title: 'Saya mahir dalam menggunakan SQL untuk mengelola dan menganalisis database',
        },
        {
            title: 'Saya berpengalaman dalam mengembangkan aplikasi mobile dengan Flutter',
        },
        {
            title: 'Saya memiliki kemampuan dalam penulisan konten kreatif dan copywriting',
        },
        {
            title: 'Saya terampil dalam menggunakan alat analitik seperti Google Analytics',
        },
        {
            title: 'Saya dapat membuat dan mengelola kampanye pemasaran digital',
        },
        {
            title: 'Saya mampu memimpin tim dalam proyek pengembangan perangkat lunak',
        },
        {
            title: 'Saya memiliki pengetahuan dalam keamanan siber dan proteksi data',
        },
        {
            title: 'Saya bisa memainkan beberapa alat musik seperti gitar dan piano',
        },
        {
            title: 'Saya mahir dalam menggunakan alat-alat pengembangan Agile seperti JIRA',
        },
        { title: 'Saya memiliki keahlian dalam optimasi mesin pencari (SEO)' },
        {
            title: 'Saya bisa merancang dan mengembangkan game menggunakan Unity',
        },
        {
            title: 'Saya ahli dalam penggunaan alat DevOps dan Continuous Integration/Continuous Deployment (CI/CD)',
        },
        {
            title: 'Saya memiliki kemampuan dalam presentasi dan public speaking yang baik',
        },
        {
            title: 'Saya terampil dalam menulis dan mengembangkan dokumentasi teknis',
        },
        { title: 'Saya bisa membuat ilustrasi digital dan animasi 2D' },
        {
            title: 'Saya memiliki pengalaman dalam manajemen proyek dengan metodologi Scrum',
        },
        {
            title: 'Saya terampil dalam editing video menggunakan Adobe Premiere Pro',
        },
        {
            title: 'Saya mahir dalam penggunaan teknologi cloud seperti AWS dan Azure',
        },
        { title: 'Saya berpengalaman dalam pemasaran melalui media sosial' },
        {
            title: 'Saya dapat melakukan pemrograman sistem tertanam (embedded systems)',
        },
        {
            title: 'Saya memiliki keahlian dalam desain UX/UI untuk aplikasi mobile dan web',
        },
        {
            title: 'Saya bisa mengembangkan skrip automasi menggunakan Bash dan PowerShell',
        },
        {
            title: 'Saya terampil dalam menyusun laporan keuangan dan analisis akuntansi',
        },
        {
            title: 'Saya memiliki kemampuan dalam pengembangan bisnis dan strategi pemasaran',
        },
    ];

    const hobiList = [
        { title: 'Saya suka mendaki gunung' },
        { title: 'Saya senang bermain gitar' },
        { title: 'Saya menikmati membaca buku fiksi ilmiah' },
        { title: 'Saya hobi bersepeda di pagi hari' },
        { title: 'Saya suka memasak dan mencoba resep baru' },
        { title: 'Saya menikmati fotografi alam' },
        { title: 'Saya senang berenang di laut' },
        { title: 'Saya suka bermain sepak bola bersama teman-teman' },
        { title: 'Saya menikmati menonton film klasik' },
        { title: 'Saya suka berkebun dan merawat tanaman' },
        { title: 'Saya hobi menggambar dan melukis' },
        { title: 'Saya senang berkemah di alam terbuka' },
        { title: 'Saya suka bermain catur' },
        { title: 'Saya menikmati yoga dan meditasi' },
        { title: 'Saya hobi membuat kerajinan tangan' },
        { title: 'Saya senang bermain video game' },
        { title: 'Saya suka berlari di taman' },
        { title: 'Saya menikmati bermain tenis' },
        { title: 'Saya suka menyanyi dan mengikuti karaoke' },
        { title: 'Saya senang menulis puisi dan cerita pendek' },
    ];

    const married_goals = [
        {
            title: 'Kami ingin membangun komunikasi yang terbuka dan jujur setiap hari',
        },
        { title: 'Kami berencana untuk menabung untuk rumah pertama kami' },
        {
            title: 'Kami ingin merayakan setiap ulang tahun pernikahan dengan perjalanan khusus',
        },
        {
            title: 'Kami berkomitmen untuk menjaga keseimbangan antara pekerjaan dan kehidupan keluarga',
        },
        {
            title: 'Kami berharap bisa menghadiri kursus parenting untuk persiapan menjadi orang tua',
        },
        {
            title: 'Kami berencana untuk memiliki dua anak dalam lima tahun ke depan',
        },
        { title: 'Kami ingin merencanakan liburan keluarga setiap tahun' },
        {
            title: 'Kami ingin menjalani gaya hidup sehat dengan olahraga bersama secara teratur',
        },
        {
            title: 'Kami berkomitmen untuk mendukung satu sama lain dalam mencapai tujuan pribadi',
        },
        {
            title: 'Kami berharap bisa membeli mobil keluarga dalam dua tahun ke depan',
        },
        {
            title: 'Kami ingin merayakan setiap momen penting dengan keluarga besar',
        },
        {
            title: 'Kami berkomitmen untuk mengikuti sesi konseling pasangan secara berkala untuk menjaga hubungan tetap kuat',
        },
        {
            title: 'Kami berencana untuk mengadakan acara keluarga setiap bulan',
        },
        {
            title: 'Kami ingin meningkatkan kemampuan memasak bersama dan mencoba resep baru',
        },
        {
            title: 'Kami berkomitmen untuk saling memberikan waktu dan perhatian yang berkualitas',
        },
        {
            title: 'Kami berharap bisa merayakan ulang tahun pernikahan ke-50 dengan keluarga besar',
        },
        {
            title: 'Kami ingin memperbaiki dan mempercantik rumah kami setiap tahun',
        },
        {
            title: 'Kami berkomitmen untuk menjaga keuangan keluarga dengan bijak dan disiplin',
        },
        {
            title: 'Kami berharap bisa pensiun dengan nyaman dan menikmati waktu bersama',
        },
        {
            title: 'Kami ingin melakukan kegiatan sukarela bersama sebagai keluarga',
        },
    ];

    const tujuanHidup = [
        {
            title: 'Saya ingin mencapai keseimbangan antara kehidupan kerja dan pribadi yang harmonis',
        },
        {
            title: 'Saya berharap bisa menjalani kehidupan dengan penuh rasa syukur dan kebahagiaan',
        },
        {
            title: 'Saya bertekad untuk terus belajar dan mengembangkan diri sepanjang hidup',
        },
        {
            title: 'Saya ingin berkontribusi positif bagi masyarakat dan membantu mereka yang membutuhkan',
        },
        {
            title: 'Saya berharap bisa menjalani hidup dengan penuh kesehatan dan energi',
        },
        {
            title: 'Saya ingin membangun hubungan yang bermakna dan mendalam dengan keluarga dan teman',
        },
        {
            title: 'Saya berencana untuk mengeksplorasi dan memahami berbagai budaya dunia melalui perjalanan',
        },
        {
            title: 'Saya berharap bisa mencapai stabilitas finansial dan hidup tanpa beban hutang',
        },
        {
            title: 'Saya bertekad untuk mengejar dan mewujudkan impian karier saya',
        },
        {
            title: 'Saya ingin menciptakan sesuatu yang memiliki dampak positif dan tahan lama',
        },
        { title: 'Saya berharap bisa hidup secara mandiri dan otonom' },
        { title: 'Saya ingin membangun keluarga yang bahagia dan harmonis' },
        {
            title: 'Saya bertekad untuk menjaga lingkungan dan menjalani gaya hidup yang ramah lingkungan',
        },
        {
            title: 'Saya berharap bisa menjadi sumber inspirasi dan motivasi bagi orang lain',
        },
        {
            title: 'Saya ingin mengejar passion saya dan menjalani hidup dengan penuh semangat',
        },
        {
            title: 'Saya berharap bisa menikmati setiap momen dalam hidup dengan penuh kesadaran dan kehadiran',
        },
        {
            title: 'Saya berkomitmen untuk menjaga kesehatan mental dan emosional saya',
        },
        {
            title: 'Saya ingin terus mengejar pendidikan dan memperoleh pengetahuan baru',
        },
        {
            title: 'Saya berharap bisa mencapai perdamaian batin dan kesejahteraan spiritual',
        },
        {
            title: 'Saya ingin mengembangkan keterampilan baru dan terus tumbuh sebagai individu',
        },
    ];

    function getRandomOfObjectArray(dataArray: any) {
        // Salin array untuk menghindari modifikasi array asli
        let shuffledArray = [...dataArray];

        // Algoritma Fisher-Yates untuk mengacak array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }

        // ambil maksimal 10 data
        return shuffledArray.slice(0, Math.floor(Math.random() * 10));
    }

    function getRandomDate(startYear = 1970, endYear = 2005) {
        // Tanggal awal: 1 Januari 1970
        const start = new Date(`${startYear}-01-01T00:00:00.000Z`).getTime();
        // Tanggal akhir: 1 Januari 2005
        const end = new Date(`${endYear}-01-01T00:00:00.000Z`).getTime();

        // Milidetik acak antara start dan end
        const randomTime =
            Math.floor(Math.random() * (end - start + 1)) + start;

        // Buat objek Date dari milidetik acak
        const randomDate = new Date(randomTime);

        // Kembalikan tanggal dalam format ISO 8601
        return randomDate.toISOString();
    }

    function getRandomAuths() {
        const authEntries = [];
        for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
            // Randomly select a user
            // const user = users[Math.floor(Math.random() * users.length)];

            // Create a random Auth entry
            const authEntry = {
                // userId: user.id,
                access_token: faker.internet.password(), // Generates a random string
                expiredAt: faker.date.future(), // Generates a future date
                path: faker.internet.url(), // Generates a random URL
                method: faker.helpers.arrayElement([
                    'GET',
                    'POST',
                    'PUT',
                    'DELETE',
                ]), // Random HTTP method
                createdAt: faker.date.past(), // Generates a past date
            };

            authEntries.push(authEntry);
        }
        return authEntries;
    }

    // BOB
    {
        const bob = {
            password,
            active: true,
            verified: true,
            activations: {
                create: {
                    expiredAt: new Date(),
                },
            },
        };

        const randoms = [];
        for (let i = 0; i < 1000; i++) {
            if (i % 2 == 0) randoms.push(i);
        }

        // create 100 Bob MEMBER
        for (let i = 0; i < 1000; i++) {
            process.stdout.write('.');
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            const firstname = faker.person.firstName('male');
            const email = faker.internet.email({ firstName: firstname });

            const randomProvinceIndex = Math.floor(
                Math.random() * provinces.length,
            );
            const randomProvinceIndex1 = Math.floor(
                Math.random() * provinces.length,
            );
            const randomProvinceIndex2 = Math.floor(
                Math.random() * provinces.length,
            );

            const data: Prisma.UserCreateInput = {
                ...bob,
                email,
                firstname,
                lastname: faker.person.lastName('male'),
                avatar: '/dummy/ikhwan_' + randomNumber + '_lg.png',
                avatar_md: '/dummy/ikhwan_' + randomNumber + '_md.png',
                blurred_avatar:
                    '/dummy/ikhwan_blurred_' + randomNumber + '_lg.png',
                blurred_avatar_md:
                    '/dummy/ikhwan_blurred_' + randomNumber + '_md.png',
            };

            const data_non_physical_character: Prisma.NonPhysicalCharacterCreateWithoutBiodataInput =
                {
                    motto: mottos[Math.floor(Math.random() * mottos.length)],
                    life_goal:
                        life_goals[
                            Math.floor(Math.random() * life_goals.length)
                        ],
                    hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
                    spare_time_activity:
                        spare_time_activities[
                            Math.floor(
                                Math.random() * spare_time_activities.length,
                            )
                        ],
                    positive_traits:
                        positive_traits[
                            Math.floor(Math.random() * positive_traits.length)
                        ],
                    negative_traits:
                        negative_traits[
                            Math.floor(Math.random() * negative_traits.length)
                        ],
                    liked_things:
                        liked_things[
                            Math.floor(Math.random() * liked_things.length)
                        ],
                    unliked_things:
                        unliked_things[
                            Math.floor(Math.random() * unliked_things.length)
                        ],
                    drink_alcohol: Math.random() < 0.5,
                    smoking: Math.random() < 0.5,
                };

            if (randoms.indexOf(i) != -1) {
                // create relasi biodata
                const startYear = new Date().getFullYear() - 3;
                const endYear = new Date().getFullYear();
                data.biodata = {
                    create: {
                        bio:
                            'Assalamualaikum, ukhti. ' +
                            biography[
                                Math.floor(Math.random() * biography.length)
                            ],
                        phone: '+628123456789',
                        company: 'Al Bashiroh Corp',
                        dob: getRandomDate(),
                        createdAt: getRandomDate(startYear, endYear),
                        birth_place: provinces[randomProvinceIndex2].name,
                        birth_order: 1,
                        address: faker.location.streetAddress(true),
                        address_town: provinces[randomProvinceIndex1].name,
                        address_province: provinces[randomProvinceIndex].name,
                        hometown_province: provinces[randomProvinceIndex2].name,
                        non_physical_characters: {
                            create: data_non_physical_character,
                        },
                        ethnic: sukuIndonesia[
                            Math.floor(Math.random() * sukuIndonesia.length)
                        ],
                        manhaj: manhaj[
                            Math.floor(Math.random() * manhaj.length)
                        ],
                        gender: 'PRIA',

                        address_zip_code: Math.floor(Math.random() * 100),
                        poligami_opinion:
                            poligamiOpinions[
                                Math.floor(
                                    Math.random() * poligamiOpinions.length,
                                )
                            ],
                        marriage_status:
                            marriedStatus[
                                Math.floor(Math.random() * marriedStatus.length)
                            ],
                        marriage_permission:
                            marriagePermissions[
                                Math.floor(
                                    Math.random() * marriagePermissions.length,
                                )
                            ],
                    },
                };
                data.auth = {
                    createMany: {
                        data: getRandomAuths(),
                    },
                };

                data.taaruf_status = 'OPEN';
            }
            const post = await prisma.user.upsert({
                where: { email },
                update: data,
                create: data,
            });
        }
    }

    // ALICE
    {
        const alice = {
            password,
            active: true,
            verified: true,
            activations: {
                create: {
                    expiredAt: new Date(),
                },
            },
        };
        const randoms = [];
        for (let i = 0; i < 1000; i++) {
            if (i % 2 == 1) randoms.push(i);
        }
        // create 100 Alice MEMBER
        for (let i = 0; i < 1000; i++) {
            process.stdout.write('.');
            const randomNumber = Math.floor(Math.random() * 10) + 1;

            const randomProvinceIndex = Math.floor(
                Math.random() * provinces.length,
            );
            const randomProvinceIndex1 = Math.floor(
                Math.random() * provinces.length,
            );
            const randomProvinceIndex2 = Math.floor(
                Math.random() * provinces.length,
            );

            const firstname = faker.person.firstName('female');
            const email = faker.internet.email({ firstName: firstname });
            const data: Prisma.UserCreateInput = {
                ...alice,
                email,
                firstname,
                lastname: faker.person.lastName('female'),
                avatar: '/dummy/akhwat_' + randomNumber + '_lg.png',
                avatar_md: '/dummy/akhwat_' + randomNumber + '_md.png',
                blurred_avatar:
                    '/dummy/akhwat_blurred_' + randomNumber + '_lg.png',
                blurred_avatar_md:
                    '/dummy/akhwat_blurred_' + randomNumber + '_md.png',
            };

            const data_non_physical_character: Prisma.NonPhysicalCharacterCreateWithoutBiodataInput =
                {
                    motto: mottos[Math.floor(Math.random() * mottos.length)],
                    life_goal:
                        life_goals[
                            Math.floor(Math.random() * life_goals.length)
                        ],
                    hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
                    spare_time_activity:
                        spare_time_activities[
                            Math.floor(
                                Math.random() * spare_time_activities.length,
                            )
                        ],
                    positive_traits:
                        positive_traits[
                            Math.floor(Math.random() * positive_traits.length)
                        ],
                    negative_traits:
                        negative_traits[
                            Math.floor(Math.random() * negative_traits.length)
                        ],
                    liked_things:
                        liked_things[
                            Math.floor(Math.random() * liked_things.length)
                        ],
                    unliked_things:
                        unliked_things[
                            Math.floor(Math.random() * unliked_things.length)
                        ],
                    drink_alcohol: Math.random() < 0.5,
                    smoking: Math.random() < 0.5,
                };

            const data_marriage_preparation: Prisma.MarriagePreparationCreateWithoutBiodataInput =
                {
                    visi: visi2[Math.floor(Math.random() * visi2.length)],
                    misi: misi2[Math.floor(Math.random() * misi2.length)],
                    mental: mental2[Math.floor(Math.random() * mental2.length)],
                    mahar: mahar2[Math.floor(Math.random() * mahar2.length)],
                    cost: costString,
                    span_time:
                        span_times[
                            Math.floor(Math.random() * span_times.length)
                        ],
                };

            if (randoms.indexOf(i) != -1) {
                // create relasi biodata
                const startYear = new Date().getFullYear() - 3;
                const endYear = new Date().getFullYear();
                data.biodata = {
                    create: {
                        bio:
                            'Assalamualaikum, akhi. ' +
                            biography[
                                Math.floor(Math.random() * biography.length)
                            ],
                        phone: '+628987654321',
                        company: 'Al Bashiroh Corp',
                        dob: getRandomDate(),
                        createdAt: getRandomDate(startYear, endYear),
                        birth_place: provinces[randomProvinceIndex2].name,
                        birth_order: 1,
                        address: faker.location.streetAddress(true),

                        address_town: provinces[randomProvinceIndex1].name,
                        address_province: provinces[randomProvinceIndex].name,
                        hometown_province: provinces[randomProvinceIndex2].name,
                        non_physical_characters: {
                            create: data_non_physical_character,
                        },
                        marriage_preparations: {
                            create: data_marriage_preparation,
                        },
                        ethnic: sukuIndonesia[
                            Math.floor(Math.random() * sukuIndonesia.length)
                        ],
                        manhaj: manhaj[
                            Math.floor(Math.random() * manhaj.length)
                        ],
                        gender: 'WANITA',
                        address_zip_code: Math.floor(Math.random() * 100),
                        poligami_opinion:
                            poligamiOpinions[
                                Math.floor(
                                    Math.random() * poligamiOpinions.length,
                                )
                            ],
                        marriage_status:
                            marriedStatus[
                                Math.floor(Math.random() * marriedStatus.length)
                            ],
                        marriage_permission:
                            marriagePermissions[
                                Math.floor(
                                    Math.random() * marriagePermissions.length,
                                )
                            ],
                    },
                };
                data.auth = {
                    createMany: {
                        data: getRandomAuths(),
                    },
                };

                data.taaruf_status = 'OPEN';
            }
            await prisma.user.upsert({
                where: { email },
                update: data,
                create: data,
            });
        }
    }

    console.log('\nSeed Finish: Member Done');
}
