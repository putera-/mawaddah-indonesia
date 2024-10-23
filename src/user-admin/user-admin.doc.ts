import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';

export function CreateAdminUserDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Login for Admin & Superadmin User',
        }),
        ApiBody({
            type: CreateUserAdminDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: sampleUserAdmin,
            },
        }),
        ApiResponse({
            status: 409,
            description: 'Error: Conflict Exception',
            schema: {
                example: {
                    message: 'Email sudah terdaftar',
                    error: 'Conflict Exception',
                    statusCode: 409,
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

export function GetAllAdminUsersDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Admin User, Restricted for Superadmin & Admin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    data: sampleUserAdmins,
                    limit: 10,
                    total: 10,
                    page: 1,
                    maxPages: 1,
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

export function GetAdminUserByIdDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Admin User By Id, Restricted for Superadmin & Admin',
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'Id of Admin User',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleUserAdmin,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function DeleteAdminUserByIdDoc() {
    return applyDecorators(
        ApiOperation({
            summary:
                'Delete Admin User By Id, Restricted for Superadmin & Admin',
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'Id of Admin User',
        }),
        ApiResponse({
            status: 204,
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan',
                    statusCode: 404,
                },
            },
        }),
    );
}

const sampleUserAdmin = {
    id: '08ec73f8-d3f8-43b3-a612-b45632ca9089',
    email: 'admin1@endmail.com',
    firstname: 'Admin',
    lastname: 'One',
    active: false,
    verified: false,
    avatar: null,
    avatar_md: null,
    blurred_avatar: null,
    blurred_avatar_md: null,
    role: 'ADMIN',
    taaruf_status: 'BLOCKED',
};

const sampleUserAdmins = [
    {
        id: '9853c6c1-85c8-4cbb-a218-476f65407f5a',
        old_id: null,
        email: 'admin9@prisma.io',
        firstname: 'Bob9',
        lastname: 'Admin',
        active: true,
        verified: true,
        avatar: '/dummy/abang.png',
        avatar_md: '/dummy/abang.png',
        blurred_avatar: null,
        blurred_avatar_md: null,
        role: 'ADMIN',
        taaruf_status: 'BLOCKED',
        createdAt: '2024-10-10T02:22:04.676Z',
        updatedAt: '2024-10-10T02:22:04.676Z',
        auth: [],
    },
    {
        id: '17e22a38-07b6-4e7b-953c-d093743a97fa',
        old_id: null,
        email: 'admin8@prisma.io',
        firstname: 'Bob8',
        lastname: 'Admin',
        active: true,
        verified: true,
        avatar: '/dummy/abang.png',
        avatar_md: '/dummy/abang.png',
        blurred_avatar: null,
        blurred_avatar_md: null,
        role: 'ADMIN',
        taaruf_status: 'BLOCKED',
        createdAt: '2024-10-10T02:22:04.663Z',
        updatedAt: '2024-10-10T02:22:04.663Z',
        auth: [],
    },
];
