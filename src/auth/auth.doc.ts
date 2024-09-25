import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GlobalUserDto } from 'src/users/dto/global-user.dto';
import { ResetPasswordDto } from 'src/reset_password/dto/reset-password.dto';
import { sendResetPassword } from './dto/send-reset-password.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ChangePasswordDto } from './dto/change-password.dto';

export function LoginDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Login for Member User',
        }),
        ApiBody({
            type: SignInDto,
        }),
        ApiResponse({
            status: 200,
            description: 'success',
            schema: {
                example: {
                    access_token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmE4NmJmMy0xMjllLTQ4YTQtOTQwNS0zZGE3YzA4OGIzMzMiLCJ1c2VybmFtZSI6ImFuYV9hYnNoaXJlNjFAZ21haWwuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTcyNzE0NDE3MSwiZXhwIjoxNzI3NzQ4OTcxfQ.R_WfgIA-SYsnk1GxylOcgTvXvbF9uWZ-NY8deptdXZs',
                    exp: 1727748971396,
                    user: {
                        id: '46a86bf3-129e-48a4-9405-3da7c088b333',
                        old_id: null,
                        email: 'ana_abshire61@gmail.com',
                        firstname: 'Ana',
                        lastname: 'Moen455',
                        active: true,
                        verified: true,
                        avatar: '/dummy/akhwat_6_lg.jpg',
                        avatar_md: '/dummy/akhwat_6_md.jpg',
                        blurred_avatar: '/dummy/akhwat_blurred_6_lg.jpg',
                        blurred_avatar_md: '/dummy/akhwat_blurred_6_md.jpg',
                        role: 'MEMBER',
                        taaruf_status: 'OPEN',
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Email atau password salah.',
                    statusCode: 401,
                },
            },
        }),
    );
}

export function LoginAdminDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Login for Admin & Superadmin User',
        }),
        ApiBody({
            type: SignInDto,
        }),
        ApiResponse({
            status: 200,
            description: 'success',
            schema: {
                example: {
                    access_token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0OGE0ZTUwOS1iYjlmLTQzMzktODRkMC00MWViY2ZmN2U1OGEiLCJ1c2VybmFtZSI6ImFkbWluMEBwcmlzbWEuaW8iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MjcwNTYzOTQsImV4cCI6MTcyNzY2MTE5NH0.grAie6LCn-tVErvKg9kXPZxjlw2mc8s5g3EG0xhrCd4',
                    exp: 1727661194467,
                    user: {
                        id: '48a4e509-bb9f-4339-84d0-41ebcff7e58a',
                        old_id: null,
                        email: 'admin0@prisma.io',
                        firstname: 'Bob0',
                        lastname: 'Admin',
                        active: true,
                        verified: true,
                        avatar: '/dummy/abang.png',
                        avatar_md: '/dummy/abang.png',
                        blurred_avatar: null,
                        blurred_avatar_md: null,
                        role: 'ADMIN',
                        taaruf_status: 'BLOCKED',
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Otentikasi tidak valid.',
                    statusCode: 401,
                },
            },
        }),
    );
}

export function RegisterDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Register user, Public',
        }),
        ApiBody({
            type: GlobalUserDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: {
                    message: 'Silahkan periksa email untuk verifikasi akun.',
                    statusCode: 201,
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Error: Bad Request',
            schema: {
                example: {
                    message: 'Email sudah terdaftar.',
                    statusCode: 400,
                },
            },
        }),
    );
}

export function ActivateDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Activate user, Public',
        }),
        ApiQuery({
            name: 'token',
            type: 'string',
            description: 'Token from email',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
        }),
        ApiResponse({
            status: 400,
            description: 'Error: Bad Request',
            schema: {
                example: {
                    message: 'Aktivasi tidak valid, atau sudah expired',
                    statusCode: 400,
                },
            },
        }),
    );
}

export function SendActivationDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Send Activation Email, Public',
        }),
        ApiQuery({
            name: 'email',
            type: 'string',
            description: 'Email to send activation',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Email salah.',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function ResetPasswordDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Reset Password, Public',
        }),
        ApiQuery({
            name: 'token',
            type: 'string',
            description: 'Token from email',
        }),
        ApiBody({
            type: ResetPasswordDto,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
        }),
        ApiResponse({
            status: 410,
            description: 'Error: Gone',
            schema: {
                example: {
                    message:
                        'Kode reset password sudah invalid, kadaluarsa, atau telah digunakan.',
                    statusCode: 410,
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan.',
                    statusCode: 404,
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Error: Bad Request',
            schema: {
                example: {
                    message: 'Konfirmasi password tidak sesuai.',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function CheckExpirationDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Check Expiration, Public',
        }),
        ApiQuery({
            name: 'token',
            type: 'string',
            description: 'Token from email',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: true,
            },
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: true,
            },
        }),
    );
}

export function SendResetPasswordDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Send Reset Password Email, Public',
        }),
        ApiBody({
            type: sendResetPassword,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Email salah.',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function ExtendAccessTokenDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Extend Access Token, Private',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    access_token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmE4NmJmMy0xMjllLTQ4YTQtOTQwNS0zZGE3YzA4OGIzMzMiLCJ1c2VybmFtZSI6ImFuYV9hYnNoaXJlNjFAZ21haWwuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTcyNzIzMDEwOSwiZXhwIjoxNzI3ODM0OTA5fQ.sR2dx_PTmpiIMNwYsn-f36hqpmg23b_PEKd_TzUNTxw',
                    exp: 1727834909187,
                },
            },
        }),
    );
}

export function GetProfileDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Profile, Private',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: exampleUser,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan.',
                    statusCode: 404,
                },
            },
        }),
    );
}

// create separate function to generate body schema
function createSchemaFromDto(dto: new () => any): SchemaObject {
    const properties: Record<string, SchemaObject> = {};
    Object.keys(new dto()).forEach((key) => {
        properties[key] = { type: 'string' };
    });
    return { type: 'object', properties };
}

export function PatchProfileDoc() {
    // use createSchemaFromDto to generate globaluser schema
    const schema = createSchemaFromDto(GlobalUserDto);

    // add image property to schema
    schema.properties.image = { type: 'string', format: 'binary' };

    return applyDecorators(
        ApiOperation({
            summary: 'Patch Profile, Private',
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: exampleUser,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan.',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function ChangePasswordDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Change Password, Private',
        }),
        ApiBody({
            type: ChangePasswordDto,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'User tidak ditemukan.',
                    statusCode: 404,
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Error: Bad Request',
            content: {
                'application/json': {
                    examples: {
                        'Password Mismatch': {
                            value: {
                                message: 'Konfirmasi password tidak sesuai.',
                                statusCode: 400,
                            },
                        },
                        'Incorrect Old Password': {
                            value: {
                                message: 'Password lama salah.',
                                statusCode: 400,
                            },
                        },
                    },
                },
            },
        }),
    );
}

export function LogoutDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Logout, Private',
        }),
        ApiResponse({
            status: 204,
        }),
    );
}

const exampleUser = {
    id: '46a86bf3-129e-48a4-9405-3da7c088b333',
    old_id: null,
    email: 'ana_abshire61@gmail.com',
    firstname: 'Ana',
    lastname: 'Moen455',
    active: true,
    verified: true,
    avatar: '/dummy/akhwat_6_lg.jpg',
    avatar_md: '/dummy/akhwat_6_md.jpg',
    blurred_avatar: '/dummy/akhwat_blurred_6_lg.jpg',
    blurred_avatar_md: '/dummy/akhwat_blurred_6_md.jpg',
    role: 'MEMBER',
    taaruf_status: 'OPEN',
    createdAt: '2023-10-23T12:23:40.488Z',
    updatedAt: '2024-09-17T02:49:13.652Z',
    isTaarufGold: false,
};
