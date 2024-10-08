import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';


export function CreateTaarufDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Taaruf, Restricted for Member' }),
        ApiBody({
            // type: CreateTaarufDto
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
            schema: {
                // example: sampleTaaruf
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }
        ),
        ApiResponse({
            status: 400,
            description: 'Error: Bad Request',
            schema: {
                example: {
                    message: 'Taaruf gagal dibuat',
                    statusCode: 400,
                },
            },
        }),
    );
}

