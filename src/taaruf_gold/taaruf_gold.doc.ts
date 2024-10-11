import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateTaarufGoldDto } from './dto/create-taaruf_gold.dto';

export function CreateTaarufGoldDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Taaruf Gold. Restricted for Member' }),
        ApiBody({
            type: CreateTaarufGoldDto, // kosong nih dtonya
        }),
        // TODO tunggu selesai unauthorized
    );
}

export function GetAllActiveGoldUsersDoc() {
    return applyDecorators(
        ApiOperation({
            summary:
                'Get All Active Gold Users. Restricted for Admin and Super admin',
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Limit of Gold User',
        }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page of Gold User',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    total: 10,
                    Page: 1,
                    maxPages: 1,
                    limit: 10,
                    data: taarufGoldUsers,
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
        ApiResponse({
            status: 403,
            description: 'Error: Forbidden',
            schema: {
                example: {
                    message: 'Forbidden',
                    statusCode: 403,
                },
            },
        }),
    );
}

export function GetAllInactiveGoldUserDoc() {
    return applyDecorators(
        ApiOperation({
            summary:
                'Get All Inactive Gold Users. Restricted for Admin and Super admin',
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Limit of Gold User',
        }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page of Gold User',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    total: 10,
                    page: 1,
                    maxPages: 1,
                    limit: 10,
                    data: taarufGoldUsers,
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

const taarufGoldUsers = [
    {
        id: '043a3667-f98b-4c1e-b87b-4d77435432f4',
        userId: '978781cf-6645-413c-b1c1-cc30031b6a71',
        startedAt: '2024-10-10T02:25:12.854Z',
        endingAt: '2024-11-10T02:25:12.854Z',
        createdAt: '2024-10-10T02:25:12.856Z',
        updatedAt: '2024-10-10T02:25:12.856Z',
        Payment: {
            id: 'fcd58833-4d2a-4318-b5d2-b6a26329452d',
            userId: '978781cf-6645-413c-b1c1-cc30031b6a71',
            gross_amount: 100000,
            midtransToken: null,
            status: 'pending',
            paidAt: '2024-10-10T02:25:12.855Z',
            createdAt: '2024-10-10T02:25:12.856Z',
            updatedAt: '2024-10-10T02:25:12.856Z',
            taaruf_goldId: '043a3667-f98b-4c1e-b87b-4d77435432f4',
        },
        user: {
            id: '978781cf-6645-413c-b1c1-cc30031b6a71',
            old_id: null,
            email: 'kristopher_auer7484@hotmail.com',
            firstname: 'Kristopher',
            lastname: 'Auer74',
            active: true,
            verified: true,
            avatar: '/dummy/ikhwan_6_lg.png',
            avatar_md: '/dummy/ikhwan_6_md.png',
            blurred_avatar: '/dummy/ikhwan_blurred_6_lg.png',
            blurred_avatar_md: '/dummy/ikhwan_blurred_6_md.png',
            role: 'MEMBER',
            taaruf_status: 'OPEN',
            createdAt: '2024-08-11T14:25:00.448Z',
            updatedAt: '2024-10-10T02:22:13.346Z',
        },
    },
    {
        id: '1314ce76-7385-44e4-93c2-cad90220443d',
        userId: '800ef530-f2e4-42f1-8f90-f0e92cb82e76',
        startedAt: '2024-10-10T02:25:12.710Z',
        endingAt: '2024-11-10T02:25:12.710Z',
        createdAt: '2024-10-10T02:25:12.711Z',
        updatedAt: '2024-10-10T02:25:12.711Z',
        Payment: {
            id: '5e978e69-fe88-4b0c-b206-8135c24f89ee',
            userId: '800ef530-f2e4-42f1-8f90-f0e92cb82e76',
            gross_amount: 100000,
            midtransToken: null,
            status: 'settlement',
            paidAt: '2024-10-10T02:25:12.710Z',
            createdAt: '2024-10-10T02:25:12.711Z',
            updatedAt: '2024-10-10T02:25:12.711Z',
            taaruf_goldId: '1314ce76-7385-44e4-93c2-cad90220443d',
        },
        user: {
            id: '800ef530-f2e4-42f1-8f90-f0e92cb82e76',
            old_id: null,
            email: 'karl_kuvalis644@gmail.com',
            firstname: 'Karl',
            lastname: 'Kuvalis64',
            active: true,
            verified: true,
            avatar: '/dummy/ikhwan_5_lg.png',
            avatar_md: '/dummy/ikhwan_5_md.png',
            blurred_avatar: '/dummy/ikhwan_blurred_5_lg.png',
            blurred_avatar_md: '/dummy/ikhwan_blurred_5_md.png',
            role: 'MEMBER',
            taaruf_status: 'OPEN',
            createdAt: '2024-09-08T05:05:58.405Z',
            updatedAt: '2024-10-10T02:22:13.091Z',
        },
    },
];
