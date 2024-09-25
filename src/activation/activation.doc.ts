import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function GetAllActivationDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Activations' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            // schema: {
            //     example: {
            //         limit: 10,
            //         total: 2,
            //         page: 1,
            //         maxPages: 1,
            //         data: [],
            //     },
            // },
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

export function DeleteActivationDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Activation By Id' }),
        ApiResponse({
            status: 200,
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
