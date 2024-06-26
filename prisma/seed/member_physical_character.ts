import { Prisma, PrismaClient, body_shape, eye_Color, hair_color, hair_type, skin_color } from '@prisma/client';


export async function member_physical_character_seed(prisma: PrismaClient) {
    console.log('\nSeeder Start: Physical Character')

    const body_shapes: body_shape[] = [
        body_shape.sangat_kurus,
        body_shape.kurus,
        body_shape.atletis,
        body_shape.normal,
        body_shape.gempal,
        body_shape.gemuk,
        body_shape.sangat_gemuk,
    ];

    const skin_colors: skin_color[] = [
        skin_color.sawo_matang,
        skin_color.putih,
        skin_color.putih_kemerahan,
        skin_color.gelap,
        skin_color.hitam,
    ];

    const hair_colors: hair_color[] = [
        hair_color.hitam,
        hair_color.pirang,
        hair_color.merah,
        hair_color.putih,
    ];

    const hair_types: hair_type[] = [
        hair_type.lurus,
        hair_type.ikal,
        hair_type.keriting,
        hair_type.kribo,
        hair_type.botak,
    ];

    const eye_colors: eye_Color[] = [
        eye_Color.hitam,
        eye_Color.coklat,
        eye_Color.biru,
        eye_Color.hijau,
    ];

    const characteristics = [
        'Saya selalu tertarik pada seni visual dan sering menghabiskan waktu luang dengan menggambar atau melukis.',
        'Sebagai seorang introvert, saya menikmati waktu sendirian untuk merenung dan membaca buku favorit saya.',
        'Saya dikenal oleh teman-teman sebagai seseorang yang sangat teliti dan selalu memastikan setiap detail dikerjakan dengan sempurna.',
        'Saya punya semangat petualangan yang tinggi dan senang mencoba hal-hal baru, seperti belajar bahasa asing atau menjelajahi tempat-tempat baru.',
        'Saya adalah seorang yang sangat empatik dan sering menjadi tempat curhat bagi teman-teman saya karena kemampuan saya untuk mendengarkan dengan baik.',
        'Organisasi adalah kekuatan saya; saya suka membuat jadwal dan memastikan semuanya berjalan sesuai rencana.',
        'Saya memiliki rasa humor yang baik dan selalu berusaha menemukan sisi lucu dari situasi sehari-hari.',
        'Musik adalah bagian penting dalam hidup saya, dan saya suka bermain gitar dan bernyanyi untuk mengungkapkan perasaan saya.',
        'Saya seorang yang tekun dan gigih; saya tidak mudah menyerah hingga mencapai tujuan yang saya tetapkan.',
        'Sebagai pecinta alam, saya sering melakukan hiking dan berkemah untuk menikmati keindahan alam dan mencari kedamaian.',
    ];

    const medical_histories = [
        'Saya pernah didiagnosis dengan kolesterol tinggi pada usia 30 tahun dan kini rutin mengonsumsi obat statin.',
        'Pada tahun 2021, saya menjalani operasi laparoskopi untuk mengangkat kantong empedu setelah serangkaian serangan batu empedu.',
        'Riwayat alergi saya termasuk reaksi terhadap serbuk sari dan debu, yang menyebabkan rhinitis alergi musiman.',
        'Ketika berusia 25 tahun, saya mengalami cedera lutut parah saat bermain sepak bola dan harus menjalani rehabilitasi selama 6 bulan.',
        'Saya memiliki riwayat migrain kronis yang sering kambuh, terutama saat stres atau kurang tidur.',
        'Pada usia 40 tahun, saya didiagnosis dengan diabetes tipe 2 dan sejak itu menjalani diet ketat serta pengobatan untuk mengontrol gula darah.',
        'Saya lahir dengan asma dan telah belajar untuk mengelola gejalanya dengan inhaler dan obat pencegahan.',
        'Saya menjalani operasi bypass jantung lima tahun lalu setelah serangan jantung dan sekarang menjalani pemeriksaan rutin kardiovaskular.',
        'Dalam riwayat keluarga saya, ada beberapa anggota yang menderita kanker kolorektal, sehingga saya melakukan kolonoskopi rutin untuk deteksi dini.',
        'Pada usia 35 tahun, saya mengalami gangguan kecemasan yang membutuhkan terapi kognitif perilaku dan obat anti-kecemasan.',
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

        const characteristic = Math.random() < 0.5;
        const medical_history = Math.random() < 0.5;

        const data: Prisma.PhysicalCharacterCreateInput = {
            Biodata: { connect: { id: bio.id } },
            height: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
            weight: Math.floor(Math.random() * (120 - 40 + 1)) + 40,
            body_shape:
                body_shapes[
                Math.floor(Math.random() * body_shapes.length)
                ],
            skin_color:
                skin_colors[
                Math.floor(Math.random() * skin_colors.length)
                ],
            hair_type:
                hair_types[
                Math.floor(Math.random() * hair_types.length)
                ],
            hair_color:
                hair_colors[
                Math.floor(Math.random() * hair_colors.length)
                ],
            eye_color:
                eye_colors[
                Math.floor(Math.random() * eye_colors.length)
                ],
            characteristic,
            characteristic_detail: characteristic
                ? characteristics[
                Math.floor(
                    Math.random() * medical_histories.length,
                )
                ]
                : null,
            medical_history,
            medical_history_detail: medical_history
                ? medical_histories[
                Math.floor(
                    Math.random() * medical_histories.length,
                )
                ]
                : null,
        };

        await prisma.physicalCharacter.create({
            data
        });

    }


    console.log('\nSeeder Finish: Physical Character')

}
