import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";




export function GetNewCandidateDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get New Candidate, Restricted for Member' }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page number'
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Number of item per page'
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    limit: 1,
                    total: 1,
                    page: 1,
                    maxPages: 12,
                    data: {
                        sampleUser1, sampleUser2
                    }
                }
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found (You need to complete biodata details)',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}

export function CandidateYouMayLikeDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Candidate You May Like, Restricted for Member' }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page number'
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Number of item per page'
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    limit: 1,
                    total: 1,
                    page: 1,
                    maxPages: 12,
                    data: {
                        sampleUser1, sampleUser2
                    }
                }
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found (You need to complete biodata details)',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}

export function CandidateGetOneDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Candidate Suggestion, Restricted for Member' }),
        ApiParam({ name: 'Candidate ID', type: String }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleUser1

            }
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found (You need to complete biodata details)',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}

export function CandidateSuggestionDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Candidate Suggestion, Restricted for Member' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    limit: 1,
                    total: 1,
                    page: 1,
                    maxPages: 12,
                    data: {
                        sampleUser1, sampleUser2
                    }
                }
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found (You need to complete biodata details)',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}



const sampleUser1 = {
    id: "76efe560-73b1-4379-82d8-6337cd0ea81a",
    old_id: null,
    email: "le...",
    firstname: "Leslie",
    lastname: "Er...",
    active: true,
    verified: true,
    blurred_avatar: "/dummy/ikhwan_blurred_6_lg.png",
    blurred_avatar_md: "/dummy/ikhwan_blurred_6_md.png",
    role: "MEMBER",
    taaruf_status: "OPEN",
    createdAt: "2024-03-22T18:54:38.792Z",
    updatedAt: "2024-09-10T01:50:07.268Z",
    biodata: {
        id: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
        userId: "76efe560-73b1-4379-82d8-6337cd0ea81a",
        bio: "Assalamualaikum, ukhti. Saya selalu berusaha untuk hidup dengan integritas dan nilai-nilai yang kuat. Saya percaya bahwa integritas adalah pondasi dari segala hubungan yang baik, baik dalam konteks profesional maupun pribadi. Saya juga menghargai kolaborasi dan tim kerja yang efektif, di mana setiap anggota tim memiliki peran penting dalam mencapai tujuan bersama. Saya senang bekerja dalam lingkungan yang dinamis dan menantang di mana saya dapat terus berkembang dan memberikan kontribusi yang signifikan.",
        phone: "+628123456789",
        company: "Al Bashiroh Corp",
        manhaj: "NON_SALAF",
        gender: "PRIA",
        marriage_status: "LAJANG",
        marriage_permission: "POLIGAMI",
        dob: "1996-05-23T00:00:00.000Z",
        birth_place: "Sumatera Utara",
        birth_order: 1,
        address: "1317 Wendy Green Suite 831",
        address_town: "Papua Selatan",
        address_province: "Papua Pegunungan",
        hometown_province: "Sumatera Utara",
        address_zip_code: 39,
        ethnic: "Timor",
        poligami_opinion: "Saya kurang suka dengan poligami",
        createdAt: "2021-08-29T04:05:57.698Z",
        updatedAt: "2024-09-10T01:50:07.268Z",
        physical_characters: {
            id: "9b217047-59f9-4f51-a581-70e8d0e07857",
            height: 178,
            weight: 81,
            body_shape: "normal",
            skin_color: "sawo_matang",
            hair_color: "putih",
            hair_type: "kribo",
            eye_color: "hitam",
            characteristic: false,
            characteristic_detail: null,
            medical_history: false,
            medical_history_detail: null,
            createdAt: "2024-09-10T01:50:53.326Z",
            updatedAt: "2024-09-10T01:50:53.326Z",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb"
        },
        non_physical_characters: {
            id: "fb68f4e6-ee7c-47c4-acef-058f5cc8deb8",
            motto: "Hidup ini singkat, jadi buatlah setiap hari berarti.",
            life_goal: "Tujuan saya adalah mengejar kebahagiaan sejati dan hidup dengan penuh makna",
            hobby: "menonton anime",
            spare_time_activity: "Ketika memiliki waktu luang, saya sering menghabiskan waktu luang di tempat-tempat yang nyaman.",
            positive_traits: "Saya selalu berusaha untuk menjadi orang yang setia dan dapat diandalkan",
            negative_traits: "Saya sering merasa iri hati terhadap kesuksesan orang lain",
            liked_things: "Saya sangat menikmati berjalan-jalan di alam dan menjelajahi tempat-tempat baru",
            unliked_things: "Saya tidak nyaman berada di tempat yang terlalu ramai dan padat",
            drink_alcohol: false,
            smoking: true,
            sport: null,
            createdAt: "2024-09-10T01:50:07.268Z",
            updatedAt: "2024-09-10T01:50:07.268Z",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb"
        },
        marriage_preparations: {
            id: "a0c5ec86-4874-48d1-aa75-6a63f9571f03",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            visi: "Menjadi inspirasi bagi generasi muda.",
            misi: "Mengelola waktu dengan bijaksana untuk mencapai keseimbangan hidup.",
            mental: "Bimbang",
            mahar: "Kambing 5 ekor",
            cost: "9855045",
            span_time: "3 bulan",
            createdAt: "2024-09-10T01:50:07.268Z",
            updatedAt: "2024-09-10T01:50:07.268Z"
        },
        family_members: [
            {
                id: "9ab9ceb7-a757-42af-bb79-efb1d6afdfbc",
                biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
                relationship: "ibu",
                religion: "islam",
                dob: "1989-12-22",
                education: "SMP",
                job: "Pegawai Swasta",
                is_alive: false,
                deleted: false,
                createdAt: "2024-09-10T01:57:06.388Z",
                updatedAt: "2024-09-10T01:57:06.388Z"
            }
        ],
        life_goals: {
            id: "9ee6781d-14ce-4945-ab6c-ebab70838479",
            career: "Central Accountability Administrator",
            domicile: "Prudencechester",
            child_count: "5",
            child_education: "Direct Markets Analyst",
            financial_arrangement: "istri",
            knowledge_upgrade: "Videografi",
            short_term_achievement: "Menyelesaikan kursus bahasa asing",
            long_term_achievement: "Memiliki portofolio investasi yang kuat",
            wife_work_permit: true,
            wife_work_permit_desc: "boleh",
            createdAt: "2024-09-10T01:57:53.310Z",
            updatedAt: "2024-09-10T01:57:53.310Z",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb"
        },
        ibadah: {
            id: "0a4c4ddc-3184-4c04-9ed1-9bd106312cbd",
            shalat_fardu: "belum_pernah",
            shalat_rawatib: "kadang_kadang",
            shalat_dhuha: "kadang_kadang",
            shalat_tahajud: "belum_pernah",
            puasa_ramadhan: "belum_pernah",
            puasa_senin_kamis: "kadang_kadang",
            puasa_daud: "rutin",
            puasa_ayamul_bid: "kadang_kadang",
            zakat: "pernah_sekali",
            sedekah: "belum_pernah",
            umrah: "pernah_sekali",
            haji: false,
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            createdAt: "2024-09-10T01:51:53.186Z",
            updatedAt: "2024-09-10T01:51:53.186Z"
        },
        physical_criteria: {
            id: "418a83e0-e23e-4aac-be0d-b8b3025105e5",
            height: 198,
            weight: 57,
            body_shape: "sangat_gemuk",
            skin_color: "putih",
            hair_color: "hitam",
            hair_type: "ikal",
            eye_color: "hijau",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            createdAt: "2024-09-10T01:50:53.326Z",
            updatedAt: "2024-09-10T01:50:53.326Z"
        },
        non_physical_criteria: {
            id: "da38efa0-d739-4fe1-ac40-1a8965314336",
            age: 23,
            domicile: "Sulawesi Tengah",
            education: "S1",
            married_status: "MENIKAH",
            sport: "Bermain panjat tebing, Bermain gymnastik",
            hobby: "Mengembangkan bisnis, Bermain musik",
            traits: "Peduli terhadap lingkungan hidup",
            ethnic: "Banjar",
            job: "Insinyur",
            other: "Menginginkan pasangan yang dapat menjadi partner dalam meningkatkan kualitas hidup, Ingin berpasangan dengan seseorang yang memiliki kemampuan berbicara dan berdiskusi dengan baik, Menginginkan pasangan yang dapat menjadi teman dalam berbagai kesempatan dan situasi",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            createdAt: "2024-09-10T01:52:17.819Z",
            updatedAt: "2024-09-10T01:52:17.819Z"
        }
    },
    auth: [
        {
            createdAt: "2024-08-15T02:49:43.560Z"
        }
    ]
}


const sampleUser2 = {
    id: "76efe560-73b1-4379-82d6-6337cd0ea81a",
    old_id: null,
    email: "ste...",
    firstname: "Stefanie",
    lastname: "Flo...",
    active: true,
    verified: true,
    blurred_avatar: "/dummy/ikhwan_blurred_6_lg.png",
    blurred_avatar_md: "/dummy/ikhwan_blurred_6_md.png",
    role: "MEMBER",
    taaruf_status: "OPEN",
    createdAt: "2024-03-22T18:54:38.792Z",
    updatedAt: "2024-09-10T01:50:07.268Z",
    biodata: {
        id: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
        userId: "76efe560-73b1-4379-82d8-6337cd0ea81a",
        bio: "Assalamualaikum, akhi. Saya selalu berusaha untuk hidup dengan integritas dan nilai-nilai yang kuat. Saya percaya bahwa integritas adalah pondasi dari segala hubungan yang baik, baik dalam konteks profesional maupun pribadi. Saya juga menghargai kolaborasi dan tim kerja yang efektif, di mana setiap anggota tim memiliki peran penting dalam mencapai tujuan bersama. Saya senang bekerja dalam lingkungan yang dinamis dan menantang di mana saya dapat terus berkembang dan memberikan kontribusi yang signifikan.",
        phone: "+628123456789",
        company: "Al Bashiroh Corp",
        manhaj: "NON_SALAF",
        gender: "WANITA",
        marriage_status: "LAJANG",
        marriage_permission: "POLIGAMI",
        dob: "1996-05-23T00:00:00.000Z",
        birth_place: "Sumatera Utara",
        birth_order: 1,
        address: "1317 Wendy Green Suite 831",
        address_town: "Papua Selatan",
        address_province: "Papua Pegunungan",
        hometown_province: "Sumatera Utara",
        address_zip_code: 39,
        ethnic: "Timor",
        poligami_opinion: "Saya kurang suka dengan poligami",
        createdAt: "2021-08-29T04:05:57.698Z",
        updatedAt: "2024-09-10T01:50:07.268Z",
        physical_characters: {
            id: "9b217047-59f9-4f51-a581-70e8d0e07857",
            height: 178,
            weight: 81,
            body_shape: "normal",
            skin_color: "sawo_matang",
            hair_color: "putih",
            hair_type: "kribo",
            eye_color: "hitam",
            characteristic: false,
            characteristic_detail: null,
            medical_history: false,
            medical_history_detail: null,
            createdAt: "2024-09-10T01:50:53.326Z",
            updatedAt: "2024-09-10T01:50:53.326Z",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb"
        },
        non_physical_characters: {
            id: "fb68f4e6-ee7c-47c4-acef-058f5cc8deb8",
            motto: "Hidup ini singkat, jadi buatlah setiap hari berarti.",
            life_goal: "Tujuan saya adalah mengejar kebahagiaan sejati dan hidup dengan penuh makna",
            hobby: "menonton anime",
            spare_time_activity: "Ketika memiliki waktu luang, saya sering menghabiskan waktu luang di tempat-tempat yang nyaman.",
            positive_traits: "Saya selalu berusaha untuk menjadi orang yang setia dan dapat diandalkan",
            negative_traits: "Saya sering merasa iri hati terhadap kesuksesan orang lain",
            liked_things: "Saya sangat menikmati berjalan-jalan di alam dan menjelajahi tempat-tempat baru",
            unliked_things: "Saya tidak nyaman berada di tempat yang terlalu ramai dan padat",
            drink_alcohol: false,
            smoking: true,
            sport: null,
            createdAt: "2024-09-10T01:50:07.268Z",
            updatedAt: "2024-09-10T01:50:07.268Z",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb"
        },
        marriage_preparations: {
            id: "a0c5ec86-4874-48d1-aa75-6a63f9571f03",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            visi: "Menjadi inspirasi bagi generasi muda.",
            misi: "Mengelola waktu dengan bijaksana untuk mencapai keseimbangan hidup.",
            mental: "Bimbang",
            mahar: "Kambing 5 ekor",
            cost: "9855045",
            span_time: "3 bulan",
            createdAt: "2024-09-10T01:50:07.268Z",
            updatedAt: "2024-09-10T01:50:07.268Z"
        },
        family_members: [
            {
                id: "9ab9ceb7-a757-42af-bb79-efb1d6afdfbc",
                biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
                relationship: "ibu",
                religion: "islam",
                dob: "1989-12-22",
                education: "SMP",
                job: "Pegawai Swasta",
                is_alive: false,
                deleted: false,
                createdAt: "2024-09-10T01:57:06.388Z",
                updatedAt: "2024-09-10T01:57:06.388Z"
            }
        ],
        life_goals: {
            id: "9ee6781d-14ce-4945-ab6c-ebab70838479",
            career: "Central Accountability Administrator",
            domicile: "Prudencechester",
            child_count: "5",
            child_education: "Direct Markets Analyst",
            financial_arrangement: "istri",
            knowledge_upgrade: "Videografi",
            short_term_achievement: "Menyelesaikan kursus bahasa asing",
            long_term_achievement: "Memiliki portofolio investasi yang kuat",
            wife_work_permit: true,
            wife_work_permit_desc: "boleh",
            createdAt: "2024-09-10T01:57:53.310Z",
            updatedAt: "2024-09-10T01:57:53.310Z",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb"
        },
        ibadah: {
            id: "0a4c4ddc-3184-4c04-9ed1-9bd106312cbd",
            shalat_fardu: "belum_pernah",
            shalat_rawatib: "kadang_kadang",
            shalat_dhuha: "kadang_kadang",
            shalat_tahajud: "belum_pernah",
            puasa_ramadhan: "belum_pernah",
            puasa_senin_kamis: "kadang_kadang",
            puasa_daud: "rutin",
            puasa_ayamul_bid: "kadang_kadang",
            zakat: "pernah_sekali",
            sedekah: "belum_pernah",
            umrah: "pernah_sekali",
            haji: false,
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            createdAt: "2024-09-10T01:51:53.186Z",
            updatedAt: "2024-09-10T01:51:53.186Z"
        },
        physical_criteria: {
            id: "418a83e0-e23e-4aac-be0d-b8b3025105e5",
            height: 198,
            weight: 57,
            body_shape: "sangat_gemuk",
            skin_color: "putih",
            hair_color: "hitam",
            hair_type: "ikal",
            eye_color: "hijau",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            createdAt: "2024-09-10T01:50:53.326Z",
            updatedAt: "2024-09-10T01:50:53.326Z"
        },
        non_physical_criteria: {
            id: "da38efa0-d739-4fe1-ac40-1a8965314336",
            age: 23,
            domicile: "Sulawesi Tengah",
            education: "S1",
            married_status: "MENIKAH",
            sport: "Bermain panjat tebing, Bermain gymnastik",
            hobby: "Mengembangkan bisnis, Bermain musik",
            traits: "Peduli terhadap lingkungan hidup",
            ethnic: "Banjar",
            job: "Insinyur",
            other: "Menginginkan pasangan yang dapat menjadi partner dalam meningkatkan kualitas hidup, Ingin berpasangan dengan seseorang yang memiliki kemampuan berbicara dan berdiskusi dengan baik, Menginginkan pasangan yang dapat menjadi teman dalam berbagai kesempatan dan situasi",
            biodataId: "c3bae40d-354d-49ff-b051-09ae45ea42fb",
            createdAt: "2024-09-10T01:52:17.819Z",
            updatedAt: "2024-09-10T01:52:17.819Z"
        }
    },
    auth: [
        {
            createdAt: "2024-08-15T02:49:43.560Z"
        }
    ]
}



