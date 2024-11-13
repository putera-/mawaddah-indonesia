import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function GetAllUserDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Users, Restricted for Superadmin & Admin',
        }),
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
                    limit: 10,
                    total: 2,
                    page: 1,
                    maxPages: 1,
                    data: [sampleUser1, sampleUser2],
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

export function GetUserDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get User By Id' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleUser1,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
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

export function ActivateUserDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Activate User By Id. Restricted for Superadmin & Admin',
        }),
        ApiResponse({
            status: 204,
            description: 'Success',
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
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

export function DeactivateUserDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Deactivate User By Id, Restricted for Superadmin & Admin',
        }),
        ApiResponse({
            status: 204,
            description: 'Success',
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
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

export function DeleteUserDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete User By Id, Restricted for Superadmin & Admin',
        }),
        ApiResponse({
            status: 204,
            description: 'Success',
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
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

const sampleUser1 = {
    id: 'b945811f-eb95-4e5c-935a-1b0b55924840',
    old_id: null,
    email: 'jo...',
    firstname: 'John',
    lastname: 'Do...',
    active: true,
    verified: true,
    blurred_avatar: '/dummy/ikhwan_blurred_6_lg.png',
    blurred_avatar_md: '/dummy/ikhwan_blurred_6_md.png',
    role: 'MEMBER',
    taaruf_status: 'OPEN',
    createdAt: '2024-08-23T03:17:51.625Z',
    updatedAt: '2024-08-23T03:22:30.513Z',
    auth: [
        {
            createdAt: '2024-07-18T17:49:25.540Z',
        },
    ],
    isTaarufGold: false,
    hasBiodata: false,
    inTaaruf: false,
};
const sampleUser2 = {
    id: 'b945811f-eb95-4e5c-935a-1b0b55924840',
    old_id: null,
    email: 'da...',
    firstname: 'David',
    lastname: 'Jo...',
    active: true,
    verified: true,
    blurred_avatar: '/dummy/ikhwan_blurred_6_lg.png',
    blurred_avatar_md: '/dummy/ikhwan_blurred_6_md.png',
    role: 'MEMBER',
    taaruf_status: 'OPEN',
    createdAt: '2024-08-23T03:17:51.625Z',
    updatedAt: '2024-08-23T03:22:30.513Z',
    auth: [
        {
            createdAt: '2024-07-18T17:49:25.540Z',
        },
    ],
    isTaarufGold: false,
    hasBiodata: false,
    inTaaruf: false,
};
