import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, body_shape, eye_Color, hair_color, hair_type, skin_color } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function memberSeed(prisma: PrismaClient) {
    const password = await bcrypt.hash('rahasia', 10);
    const provinces = await prisma.province.findMany();

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
        hair_color.putih
    ];

    const hair_types: hair_type[] = [
        hair_type.lurus,
        hair_type.ikal,
        hair_type.keriting,
        hair_type.kribo,
        hair_type.botak
    ];

    const eye_colors: eye_Color[] = [
        eye_Color.hitam,
        eye_Color.coklat,
        eye_Color.biru,
        eye_Color.hijau
    ];

    const characteristics = [
        "Saya selalu tertarik pada seni visual dan sering menghabiskan waktu luang dengan menggambar atau melukis.",
        "Sebagai seorang introvert, saya menikmati waktu sendirian untuk merenung dan membaca buku favorit saya.",
        "Saya dikenal oleh teman-teman sebagai seseorang yang sangat teliti dan selalu memastikan setiap detail dikerjakan dengan sempurna.",
        "Saya punya semangat petualangan yang tinggi dan senang mencoba hal-hal baru, seperti belajar bahasa asing atau menjelajahi tempat-tempat baru.",
        "Saya adalah seorang yang sangat empatik dan sering menjadi tempat curhat bagi teman-teman saya karena kemampuan saya untuk mendengarkan dengan baik.",
        "Organisasi adalah kekuatan saya; saya suka membuat jadwal dan memastikan semuanya berjalan sesuai rencana.",
        "Saya memiliki rasa humor yang baik dan selalu berusaha menemukan sisi lucu dari situasi sehari-hari.",
        "Musik adalah bagian penting dalam hidup saya, dan saya suka bermain gitar dan bernyanyi untuk mengungkapkan perasaan saya.",
        "Saya seorang yang tekun dan gigih; saya tidak mudah menyerah hingga mencapai tujuan yang saya tetapkan.",
        "Sebagai pecinta alam, saya sering melakukan hiking dan berkemah untuk menikmati keindahan alam dan mencari kedamaian."
    ]
    const medical_histories = [
        "Saya pernah didiagnosis dengan kolesterol tinggi pada usia 30 tahun dan kini rutin mengonsumsi obat statin.",
        "Pada tahun 2021, saya menjalani operasi laparoskopi untuk mengangkat kantong empedu setelah serangkaian serangan batu empedu.",
        "Riwayat alergi saya termasuk reaksi terhadap serbuk sari dan debu, yang menyebabkan rhinitis alergi musiman.",
        "Ketika berusia 25 tahun, saya mengalami cedera lutut parah saat bermain sepak bola dan harus menjalani rehabilitasi selama 6 bulan.",
        "Saya memiliki riwayat migrain kronis yang sering kambuh, terutama saat stres atau kurang tidur.",
        "Pada usia 40 tahun, saya didiagnosis dengan diabetes tipe 2 dan sejak itu menjalani diet ketat serta pengobatan untuk mengontrol gula darah.",
        "Saya lahir dengan asma dan telah belajar untuk mengelola gejalanya dengan inhaler dan obat pencegahan.",
        "Saya menjalani operasi bypass jantung lima tahun lalu setelah serangan jantung dan sekarang menjalani pemeriksaan rutin kardiovaskular.",
        "Dalam riwayat keluarga saya, ada beberapa anggota yang menderita kanker kolorektal, sehingga saya melakukan kolonoskopi rutin untuk deteksi dini.",
        "Pada usia 35 tahun, saya mengalami gangguan kecemasan yang membutuhkan terapi kognitif perilaku dan obat anti-kecemasan."
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
        'Jadilah dirimu sendiri, semua orang lain sudah ada yang memiliki.'
    ]

    const life_goals: string[] = [
        'Tujuan hidup saya adalah mencapai keseimbangan antara karier dan kehidupan pribadi',
        'Saya bercita-cita untuk mendirikan bisnis sendiri dan memberikan lapangan kerja bagi orang lain',
        'Saya ingin terus belajar dan mengembangkan diri agar bisa menjadi ahli di bidang saya',
        'Tujuan hidup saya adalah membangun keluarga yang bahagia dan harmonis',
        'Saya ingin berkontribusi pada masyarakat dengan melakukan kegiatan sukarelawan',
        'Tujuan saya adalah mengejar kebahagiaan sejati dan hidup dengan penuh makna'
    ]

    const hobbies: string[] = [
        'membaca',
        'menonton',
        'menyanyi',
        'menonton film',
        'menonton anime',
        'menonton game',
        'mengaji',
        'menggambar',
    ]

    const spare_time_activities: string[] = [
        'Saat waktu luang, saya suka menghabiskannya dengan berjalan-jalan di taman.',
        'Di waktu luang, saya sering mendengarkan musik atau bermain alat musik.',
        'Ketika memiliki waktu luang, saya senang memasak dan mencoba resep-resep baru.',
        'Pada waktu luang, saya suka menonton film atau serial televisi favorit.',
        'Ketika memiliki waktu luang, saya sering menghabiskan waktu luang di tempat-tempat yang nyaman.',
        'Di waktu luang, saya sering bermain game dan bermain permainan komputer.',
    ]

    const positive_traits: string[] = [
        'Saya orangnya jujur dan pemaaf.',
        'Saya sangat pintar dan suka berpikir positif.',
        'Saya dikenal sebagai orang yang sabar dan penuh pengertian.',
        'Saya selalu berusaha untuk menjadi orang yang ramah dan mudah bergaul',
        'Saya orangnya pekerja keras dan bertanggung jawab',
        'Saya selalu berusaha untuk menjadi orang yang setia dan dapat diandalkan'
    ]

    const negative_traits: string[] = [
        'Saya orangnya sering terburu-buru dan kurang sabar',
        'Saya cenderung keras kepala dan sulit menerima pendapat orang lain',
        'Saya sering merasa iri hati terhadap kesuksesan orang lain',
        'Saya orangnya mudah marah dan emosional',
        'Saya sering menunda-nunda pekerjaan dan sulit menjaga disiplin',
        'Saya kadang-kadang terlalu pesimis dan sulit melihat sisi positif dari situasi'
    ]

    const liked_things: string[] = [
        'Saya suka membaca buku, terutama novel fiksi dan biografi',
        'Saya sangat menikmati berjalan-jalan di alam dan menjelajahi tempat-tempat baru',
        'Saya suka memasak dan mencoba resep-resep baru di waktu luang',
        'Saya menikmati bermain olahraga seperti sepak bola dan bulu tangkis',
        'Saya suka menonton film, terutama film-film dokumenter dan drama',
        'Saya suka berkebun dan merawat tanaman di halaman rumah'
    ]

    const unliked_things: string[] = [
        'Saya tidak suka menunggu terlalu lama, terutama dalam antrean yang panjang',
        'Saya kurang menyukai makanan yang terlalu pedas',
        'Saya tidak suka dengan kebisingan yang berlebihan, terutama saat mencoba untuk fokus',
        'Saya tidak suka menonton film yang terlalu panjang',
        'Saya tidak nyaman berada di tempat yang terlalu ramai dan padat',
        'Saya tidak suka dengan orang yang suka menggosip atau membicarakan orang lain di belakang mereka'
    ]



    console.log('Seed: Member');

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

            const randomProvinceIndex = Math.floor(Math.random() * provinces.length);
            const randomProvinceIndex1 = Math.floor(Math.random() * provinces.length);
            const randomProvinceIndex2 = Math.floor(Math.random() * provinces.length);

            const data: Prisma.UserCreateInput = {
                ...bob,
                email,
                firstname,
                lastname: faker.person.lastName('male'),
                avatar: '/dummy/ikhwan_' + randomNumber + '_lg.png',
                avatar_md: '/dummy/ikhwan_' + randomNumber + '_md.png',
                blurred_avatar: '/dummy/ikhwan_blurred_' + randomNumber + '_lg.png',
                blurred_avatar_md:
                    '/dummy/ikhwan_blurred_' + randomNumber + '_md.png',
            };

            const characteristic = Math.random() < 0.5
            const medical_history = Math.random() < 0.5

            const data_physical_character: Prisma.PhysicalCharacterCreateInput = {
                body_shape: body_shapes[Math.floor(Math.random() * body_shapes.length)],
                skin_color: skin_colors[Math.floor(Math.random() * skin_colors.length)],
                hair_type: hair_types[Math.floor(Math.random() * hair_types.length)],
                hair_color: hair_colors[Math.floor(Math.random() * hair_colors.length)],
                eye_color: eye_colors[Math.floor(Math.random() * eye_colors.length)],
                characteristic,
                characteristic_detail: characteristic ? characteristics[Math.floor(Math.random() * medical_histories.length)] : null,
                medical_history,
                medical_history_detail: medical_history ? medical_histories[Math.floor(Math.random() * medical_histories.length)] : null,
            }

            const data_non_physical_character: Prisma.NonPhysicalCharacterCreateInput = {
                motto: mottos[Math.floor(Math.random() * mottos.length)],
                life_goal: life_goals[Math.floor(Math.random() * life_goals.length)],
                hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
                spare_time_activity: spare_time_activities[Math.floor(Math.random() * spare_time_activities.length)],
                positive_traits: positive_traits[Math.floor(Math.random() * positive_traits.length)],
                negative_traits: negative_traits[Math.floor(Math.random() * negative_traits.length)],
                liked_things: liked_things[Math.floor(Math.random() * liked_things.length)],
                unliked_things: unliked_things[Math.floor(Math.random() * unliked_things.length)],
                drink_alcohol: Math.random() < 0.5,
                smoking: Math.random() < 0.5,
            }

            if (randoms.indexOf(i) != -1) {
                // create relasi biodata
                data.biodata = {
                    create: {
                        bio: 'Assalamualaikum, ukhti.',
                        phone: '+628123456789',
                        dob: '2005-01-01T00:00:00.000Z',
                        birth_place: provinces[randomProvinceIndex2].name,
                        birth_order: 1,
                        domicile_town: provinces[randomProvinceIndex1].name,
                        domicile_province: provinces[randomProvinceIndex].name,
                        hometown_province: provinces[randomProvinceIndex2].name,
                        physical_characters: {
                            create: data_physical_character,
                        },
                        ethnic: 'Jawa',
                        manhaj: 'SALAF',
                        gender: 'PRIA',
                        marriage_status: 'LAJANG',
                        marriage_permission: 'NON_POLIGAMI',
                    },
                };
                data.Skill = {
                    createMany: {
                        data: [
                            {
                                title: 'komunikasi',
                            },
                            {
                                title: 'bela diri',
                            },
                            {
                                title: 'mengelola keuangan',
                            },
                            {
                                title: 'mengendalikan emosi',
                            },
                        ],
                    },
                };
                data.Hobby = {
                    createMany: {
                        data: [
                            { title: 'membaca buku' },
                            { title: 'bermain games' },
                            { title: 'memasak' },
                        ],
                    },
                };
                data.Education = {
                    createMany: {
                        data: [
                            {
                                institution_name: 'Universitas Al-Bashiroh',
                                degree: 'Bachelor',
                                major: 'Japanese Literature',
                                city: 'Jakarta',
                                startYear: 2022,
                            },
                            {
                                institution_name: 'SMA Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2019,
                            },
                            {
                                institution_name: 'SMP Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2016,
                            },
                        ],
                    },
                };
                data.Married_goal = {
                    createMany: {
                        data: [
                            { title: 'rumah tangga islami dan sunnah' },
                            { title: 'membawa keluarga ke surga' },
                            { title: 'memiliki banyak keturunan' },
                            { title: 'menyempurnakan satu sama lain' },
                        ],
                    },
                };
                data.Life_goal = {
                    createMany: {
                        data: [
                            { title: 'bekerja dengan passion yang dimiliki' },
                            {
                                title: 'menjalin hubungan pertemanan yang berkualitas',
                            },
                            { title: 'menjaga kesehatan tubuh' },
                        ],
                    },
                };
            }
            await prisma.user.upsert({
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

            const randomProvinceIndex = Math.floor(Math.random() * provinces.length);
            const randomProvinceIndex1 = Math.floor(Math.random() * provinces.length);
            const randomProvinceIndex2 = Math.floor(Math.random() * provinces.length);

            const firstname = faker.person.firstName('female');
            const email = faker.internet.email({ firstName: firstname });
            const data: Prisma.UserCreateInput = {
                ...alice,
                email,
                firstname,
                lastname: faker.person.lastName('female'),
                avatar: '/dummy/akhwat_' + randomNumber + '_lg.png',
                avatar_md: '/dummy/akhwat_' + randomNumber + '_md.png',
                blurred_avatar: '/dummy/akhwat_blurred_' + randomNumber + '_lg.png',
                blurred_avatar_md:
                    '/dummy/akhwat_blurred_' + randomNumber + '_md.png',
            };

            const characteristic = Math.random() < 0.5
            const medical_history = Math.random() < 0.5

            const data_physical_character: Prisma.PhysicalCharacterCreateInput = {
                body_shape: body_shapes[Math.floor(Math.random() * body_shapes.length)],
                skin_color: skin_colors[Math.floor(Math.random() * skin_colors.length)],
                hair_type: hair_types[Math.floor(Math.random() * hair_types.length)],
                hair_color: hair_colors[Math.floor(Math.random() * hair_colors.length)],
                eye_color: eye_colors[Math.floor(Math.random() * eye_colors.length)],
                characteristic,
                characteristic_detail: characteristic ? characteristics[Math.floor(Math.random() * medical_histories.length)] : null,
                medical_history,
                medical_history_detail: medical_history ? medical_histories[Math.floor(Math.random() * medical_histories.length)] : null,
            }

            const data_non_physical_character: Prisma.NonPhysicalCharacterCreateInput = {
                motto: mottos[Math.floor(Math.random() * mottos.length)],
                life_goal: life_goals[Math.floor(Math.random() * life_goals.length)],
                hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
                spare_time_activity: spare_time_activities[Math.floor(Math.random() * spare_time_activities.length)],
                positive_traits: positive_traits[Math.floor(Math.random() * positive_traits.length)],
                negative_traits: negative_traits[Math.floor(Math.random() * negative_traits.length)],
                liked_things: liked_things[Math.floor(Math.random() * liked_things.length)],
                unliked_things: unliked_things[Math.floor(Math.random() * unliked_things.length)],
                drink_alcohol: Math.random() < 0.5,
                smoking: Math.random() < 0.5,
            }


            if (randoms.indexOf(i) != -1) {
                // create relasi biodata
                data.biodata = {
                    create: {
                        bio: 'Assalamualaikum, akhi.',
                        phone: '+628987654321',
                        dob: '2005-01-01T00:00:00.000Z',
                        birth_place: provinces[randomProvinceIndex2].name,
                        birth_order: 1,
                        domicile_town: provinces[randomProvinceIndex1].name,
                        domicile_province: provinces[randomProvinceIndex].name,
                        hometown_province: provinces[randomProvinceIndex2].name,
                        physical_characters: {
                            create: data_physical_character,
                        },
                        non_physical_chars: {
                            create: data_non_physical_character,
                        },
                        ethnic: 'lampung',
                        manhaj: 'SALAF',
                        gender: 'WANITA',
                        marriage_status: 'LAJANG',
                        marriage_permission: 'NON_POLIGAMI',
                    },
                };
                data.Skill = {
                    createMany: {
                        data: [
                            {
                                title: 'public speaking bagus',
                            },
                            {
                                title: 'mengendarai mobil',
                            },
                            {
                                title: 'mengelola keuangan',
                            },
                            {
                                title: 'mengendalikan emosi',
                            },
                        ],
                    },
                };
                data.Hobby = {
                    createMany: {
                        data: [
                            { title: 'membaca buku' },
                            { title: 'berkebun' },
                            { title: 'memasak' },
                        ],
                    },
                };
                data.Education = {
                    createMany: {
                        data: [
                            {
                                institution_name: 'Universitas Al-Bashiroh',
                                degree: 'Bachelor',
                                major: 'Japanese Literature',
                                city: 'Jakarta',
                                startYear: 2022,
                            },
                            {
                                institution_name: 'SMA Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2019,
                            },
                            {
                                institution_name: 'SMP Al-Bashiroh',
                                city: 'Jakarta',
                                startYear: 2016,
                            },
                        ],
                    },
                };
                data.Married_goal = {
                    createMany: {
                        data: [
                            { title: 'menyempurnakan satu sama lain' },
                            { title: 'memiliki banyak keturunan' },
                            { title: 'bersama hingga ujung usia' },
                        ],
                    },
                };
                data.Life_goal = {
                    createMany: {
                        data: [
                            { title: 'hidup tenang di hari tua' },
                            { title: 'menjalin hubungan keluarga yang erat' },
                            { title: 'menjaga kesehatan tubuh' },
                        ],
                    },
                };
            }
            await prisma.user.upsert({
                where: { email },
                update: data,
                create: data,
            });
        }
    }

    console.log('Seed: Member Done');
}
