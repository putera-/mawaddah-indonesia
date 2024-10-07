import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function CreateBookmarkDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Bookmark. Restricted for Member' }),
        ApiResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: {
                    message: 'Bookmark berhasil dibuat',
                    statusCode: 201,
                    data: {
                        id: '642012345678901234567890',
                        userId: '642012345678901234567890',
                        candidateId: '642012345678901234567890',
                        createdAt: '2023-03-27T06:00:00.000Z',
                        updatedAt: '2023-03-27T06:00:00.000Z',
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Error : Bad Request',
            schema: {
                example: {
                    message: 'Bad Request',
                    statusCode: 400,
                },
            },
        }),
    );
}

export function GetAllBookmarkDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Bookmark. Restricted for Member' }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Number of item per page',
        }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page number',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    page: 1,
                    limit: 10,
                    maxPages: 1,
                    total: 2,
                    data: sampleBookmarks,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401,
                },
            },
        }),
    );
}

export function GetBookmarkByIdDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Bookmark By Id. Restricted for Member' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleBookmark,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Bookmark tidak ditemukan',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function CheckBookmarkDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Check Bookmark By Id. Restricted for Member',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    message: true,
                    statusCode: 200,
                },
            },
        }),
    );
}

export function RemoveBookmarkDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Remove Bookmark By Id. Restricted for Member',
        }),
        ApiResponse({
            status: 204,
        }),
    );
}

const sampleBookmarks = [
    {
        id: 'eee84049-7a9e-4bad-9bac-6ab1ea90cb87',
        userId: '00178a81-2d4b-4201-a6a8-ca32e98a0c1e',
        candidateId: 'd91a452b-6492-4d89-9085-16d743f6e9aa',
        bookmarked: true,
        createdAt: '2024-09-10T01:56:10.538Z',
        updatedAt: '2024-09-10T01:56:10.538Z',
        candidate: {
            id: 'd91a452b-6492-4d89-9085-16d743f6e9aa',
            old_id: null,
            email: 'ro...',
            firstname: 'Roland',
            lastname: 'Fe...',
            active: true,
            verified: true,
            blurred_avatar: '/dummy/ikhwan_blurred_10_lg.png',
            blurred_avatar_md: '/dummy/ikhwan_blurred_10_md.png',
            role: 'MEMBER',
            taaruf_status: 'OPEN',
            createdAt: '2024-01-10T06:22:29.081Z',
            updatedAt: '2024-09-10T01:50:13.238Z',
            biodata: {
                id: '2ce749d0-57cf-49b9-9dbd-23c83d4e3d31',
                userId: 'd91a452b-6492-4d89-9085-16d743f6e9aa',
                bio: 'Assalamualaikum, ukhti. Saya telah belajar banyak dalam perjalanan hidup saya, terutama dalam konteks pengembangan pribadi dan profesional. Saya memulai karier saya sebagai seorang pengembang perangkat lunak dengan mengejar gelar teknik informatika dari universitas terkemuka. Selama belajar di perguruan tinggi, saya aktif dalam berbagai kegiatan ekstrakurikuler dan organisasi mahasiswa, yang membantu saya memperluas jaringan dan keterampilan interpersonal saya. Setelah lulus, saya bergabung dengan sebuah perusahaan teknologi global di mana saya belajar tentang pengembangan perangkat lunak skala besar dan manajemen proyek.',
                phone: '+628123456789',
                company: 'Al Bashiroh Corp',
                manhaj: 'SALAF',
                gender: 'PRIA',
                marriage_status: 'CERAI_HIDUP',
                marriage_permission: 'POLIGAMI',
                dob: '1986-02-16T00:00:00.000Z',
                birth_place: 'Papua Barat Daya',
                birth_order: 1,
                address: '59077 Walnut Street Apt. 993',
                address_town: 'Sulawesi Tenggara',
                address_province: 'Maluku',
                hometown_province: 'Papua Barat Daya',
                address_zip_code: 22,
                ethnic: 'Papua',
                poligami_opinion:
                    'Menurutku poligami itu sah-sah aja asal tujuan dan caranya baik-baik',
                createdAt: '2021-03-26T05:43:15.223Z',
                updatedAt: '2024-09-10T01:50:13.238Z',
            },
        },
    },
    {
        id: '27756d9a-0e85-4c0a-b92c-f0e946b0128d',
        userId: '00178a81-2d4b-4201-a6a8-ca32e98a0c1e',
        candidateId: '7ac4703d-8a7a-4083-bcbd-8910a4a7f647',
        bookmarked: true,
        createdAt: '2024-09-10T01:56:10.481Z',
        updatedAt: '2024-09-10T01:56:10.481Z',
        candidate: {
            id: '7ac4703d-8a7a-4083-bcbd-8910a4a7f647',
            old_id: null,
            email: 'cl...',
            firstname: 'Clark',
            lastname: 'Ab...',
            active: true,
            verified: true,
            blurred_avatar: '/dummy/ikhwan_blurred_3_lg.png',
            blurred_avatar_md: '/dummy/ikhwan_blurred_3_md.png',
            role: 'MEMBER',
            taaruf_status: 'OPEN',
            createdAt: '2024-04-10T13:54:18.463Z',
            updatedAt: '2024-09-10T01:50:13.178Z',
            biodata: {
                id: '0dcda325-92d7-4e31-8c07-c2422c55fb09',
                userId: '7ac4703d-8a7a-4083-bcbd-8910a4a7f647',
                bio: 'Assalamualaikum, ukhti. Di samping karier profesional saya, saya memiliki minat yang besar dalam pengajaran dan pendidikan. Saya telah menjadi pembicara di berbagai konferensi teknologi dan menyampaikan kuliah tamu di universitas lokal. Saya juga aktif sebagai mentor bagi para profesional muda di industri IT, membimbing mereka dalam pengembangan karier dan keahlian teknis. Saya percaya bahwa berbagi pengetahuan adalah kunci untuk mendorong inovasi dan pertumbuhan di komunitas teknologi.',
                phone: '+628123456789',
                company: 'Al Bashiroh Corp',
                manhaj: 'SALAF',
                gender: 'PRIA',
                marriage_status: 'CERAI_HIDUP',
                marriage_permission: 'POLIGAMI',
                dob: '2002-05-10T00:00:00.000Z',
                birth_place: 'Sumatera Utara',
                birth_order: 1,
                address: '80393 Russell Street Apt. 540',
                address_town: 'Nanggroe Aceh Darussalam',
                address_province: 'Papua Pegunungan',
                hometown_province: 'Sumatera Utara',
                address_zip_code: 56,
                ethnic: 'Torres Strait Islander',
                poligami_opinion: 'Saya sangat suka dengan poligami',
                createdAt: '2022-10-17T00:21:26.172Z',
                updatedAt: '2024-09-10T01:50:13.178Z',
            },
        },
    },
];

const sampleBookmark = {
    id: 'eee84049-7a9e-4bad-9bac-6ab1ea90cb87',
    userId: '00178a81-2d4b-4201-a6a8-ca32e98a0c1e',
    candidateId: 'd91a452b-6492-4d89-9085-16d743f6e9aa',
    bookmarked: true,
    createdAt: '2024-09-10T01:56:10.538Z',
    updatedAt: '2024-09-10T01:56:10.538Z',
    candidate: {
        id: 'd91a452b-6492-4d89-9085-16d743f6e9aa',
        old_id: null,
        email: 'ro...',
        firstname: 'Roland',
        lastname: 'Fe...',
        active: true,
        verified: true,
        blurred_avatar: '/dummy/ikhwan_blurred_10_lg.png',
        blurred_avatar_md: '/dummy/ikhwan_blurred_10_md.png',
        role: 'MEMBER',
        taaruf_status: 'OPEN',
        createdAt: '2024-01-10T06:22:29.081Z',
        updatedAt: '2024-09-10T01:50:13.238Z',
        biodata: {
            id: '2ce749d0-57cf-49b9-9dbd-23c83d4e3d31',
            userId: 'd91a452b-6492-4d89-9085-16d743f6e9aa',
            bio: 'Assalamualaikum, ukhti. Saya telah belajar banyak dalam perjalanan hidup saya, terutama dalam konteks pengembangan pribadi dan profesional. Saya memulai karier saya sebagai seorang pengembang perangkat lunak dengan mengejar gelar teknik informatika dari universitas terkemuka. Selama belajar di perguruan tinggi, saya aktif dalam berbagai kegiatan ekstrakurikuler dan organisasi mahasiswa, yang membantu saya memperluas jaringan dan keterampilan interpersonal saya. Setelah lulus, saya bergabung dengan sebuah perusahaan teknologi global di mana saya belajar tentang pengembangan perangkat lunak skala besar dan manajemen proyek.',
            phone: '+628123456789',
            company: 'Al Bashiroh Corp',
            manhaj: 'SALAF',
            gender: 'PRIA',
            marriage_status: 'CERAI_HIDUP',
            marriage_permission: 'POLIGAMI',
            dob: '1986-02-16T00:00:00.000Z',
            birth_place: 'Papua Barat Daya',
            birth_order: 1,
            address: '59077 Walnut Street Apt. 993',
            address_town: 'Sulawesi Tenggara',
            address_province: 'Maluku',
            hometown_province: 'Papua Barat Daya',
            address_zip_code: 22,
            ethnic: 'Papua',
            poligami_opinion:
                'Menurutku poligami itu sah-sah aja asal tujuan dan caranya baik-baik',
            createdAt: '2021-03-26T05:43:15.223Z',
            updatedAt: '2024-09-10T01:50:13.238Z',
        },
    },
};
