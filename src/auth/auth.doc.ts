import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export function LoginDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Login user',
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
            summary: 'Login for Admin & Superadmin',
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
            summary: 'Register user',
        }),
        ApiBody({
            type: CreateUserDto,
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
