import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function CreateAkadDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create New Akad, Restricted for Member' }),
        ApiParam({
            name: 'taarufid',
            required: true,
            type: String,
            description: 'ID of Taaruf',
        }),
        ApiResponse({
            status: 201,
            description: 'Akad berhasil dibuat.',
            schema: {
                example: {},
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
            schema: {
                example: {
                    message: 'Taaruf gagal dibuat',
                    statusCode: 400,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
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
                    message: 'Data taaruf tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function UpdateAkadDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Akad Date, Restricted for Member' }),
        ApiParam({
            name: 'akadid',
            required: true,
            type: String,
            description: 'ID of Akad',
        }),
        ApiResponse({
            status: 200,
            description: 'Akad berhasil diperbarui.',
            schema: {
                example: {},
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
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

export function CancelAkadDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Cancel Akad, Restricted for Member' }),
        ApiParam({
            name: 'akadid',
            required: true,
            type: String,
            description: 'ID of Akad',
        }),
        ApiResponse({
            status: 200,
            description: 'Akad berhasil dibatalkan.',
            schema: {
                example: {},
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
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
export function ApproveAkadDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Approve Akad, Restricted for Member' }),
        ApiParam({
            name: 'akadid',
            required: true,
            type: String,
            description: 'ID of Akad',
        }),
        ApiResponse({
            status: 200,
            description: 'Akad berhasil disetujui.',
            schema: {
                example: {},
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
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
export function RejectAkadDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Reject Akad, Restricted for Member' }),
        ApiParam({
            name: 'akadid',
            required: true,
            type: String,
            description: 'ID of Akad',
        }),
        ApiResponse({
            status: 200,
            description: 'Akad berhasil ditolak.',
            schema: {
                example: {},
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
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

const sampleAkad1 = {};
