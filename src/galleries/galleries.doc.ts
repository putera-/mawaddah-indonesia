import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CreateGalleryDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Gallery, Restricted for Superadmin & Admin',
        }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        example: 'Gallery 1',
                    },
                    description: {
                        type: 'string',
                        example: 'This is gallery 1',
                    },
                    photo: {
                        type: 'string',
                        example:
                            'http://localhost:3000/public/photos/1681681681681_lg.jpg',
                    },
                },
            },
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
        }),
        ApiResponse({
            
        })
    );
}

export function GetAllGalleriesDoc() {}

export function GetGalleryByIdDoc() {}

export function UpdateGalleryDoc() {}

export function RemoveGalleryDoc() {}
