import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserSuperadminDto } from './dto/create-user-superadmin.dto';

export function CreateFirstSuperAdminDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create first Super admin user. Public',
        }),
        ApiBody({
            type: CreateUserSuperadminDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: {
                    message: 'success',
                    statusCode: 201,
                    data: superAdmin,
                },
            },
        }),
    );
}

export function CreateSuperAdminDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Super admin user. Restricted for Super Admin',
        }),
        ApiBody({
            type: CreateUserSuperadminDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: {
                    message: 'success',
                    statusCode: 201,
                    data: superAdmin,
                },
            },
        }),
    );
}

export function GetAllSuperAdminDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get all Super admin users. Restricted for Super Admin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    data: [superAdmin, superAdmin],
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

export function GetSuperAdminByIdDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Super admin user by id. Restricted for Super Admin',
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'Super admin Id',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    data: superAdmin,
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

export function DeleteSuperAdminDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete Super admin user. Restricted for Super Admin',
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'Super admin Id',
        }),
        ApiResponse({
            status: 204,
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

const superAdmin = {
    id: '68e91756-0324-46d9-8738-a345a12345b',
    email: 'superadmin1@gmail.com',
    firstname: 'Super',
    lastname: 'Admin',
    active: false,
    verified: false,
    avatar: null,
    avatar_md: null,
    blurred_avatar: null,
    blurred_avatar_md: null,
    role: 'MEMBER',
    taaruf_status: 'BLOCKED',
};
