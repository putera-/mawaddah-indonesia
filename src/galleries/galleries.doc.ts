import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

export function CreateGalleryDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Gallery, Restricted for Superadmin & Admin',
        }),
        ApiBody({
            type: CreateGalleryDto
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            description: 'Upload a single photo',
            type: 'multipart/form-data',
            schema: {
                type: 'object',
                properties: {
                    data: {
                        type: 'string',
                        description:
                            'Other form data fields from CreateGalleryDto',
                    },
                    photo: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                        description: 'Single photo to upload',
                    },
                },
            },
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
        }),
    );
}

export function GetAllGalleriesDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Galleries, Public',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleGalleries,
            },
        }),
    );
}

export function GetGalleryByIdDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Gallery By Id, Public',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleGallery,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Not Found',
        }),
    );
}

export function UpdateGalleryDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Gallery By Id, Restricted for Superadmin & Admin',
        }),
        ApiBody({
            type: UpdateGalleryDto
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleGallery,
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
        }),
        ApiResponse({
            status: 404,
            description: 'Not Found',
        }),
    );
}

export function RemoveGalleryDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Gallery By Id, Restricted for Superadmin & Admin',
        }),
        ApiResponse({
            status: 204,
        }),
    );
}

const sampleGallery = {
    id: 'd01deafa-e7b5-405a-91c3-26b2494c5f4b',
    clientId: '94de0914-cf51-47a4-8234-812824d9848a',
    title: 'Mawaddah Indonesia',
    photo: 'https://picsum.photos/seed/VxEmMguN/640/480',
    createdAt: '2024-09-10T01:50:08.050Z',
    updatedAt: '2024-09-10T01:50:08.050Z',
};
const sampleGalleries = [
    {
        id: 'd01deafa-e7b5-405a-91c3-26b2494c5f4b',
        clientId: '94de0914-cf51-47a4-8234-812824d9848a',
        title: 'Mawaddah Indonesia',
        photo: 'https://picsum.photos/seed/VxEmMguN/640/480',
        createdAt: '2024-09-10T01:50:08.050Z',
        updatedAt: '2024-09-10T01:50:08.050Z',
    },
    {
        id: '762fbfcc-dac7-4d62-ba0c-fbaa8f87da5f',
        clientId: '94de0914-cf51-47a4-8234-812824d9848a',
        title: 'Mawaddah Indonesia Official',
        photo: 'https://loremflickr.com/640/480?lock=8638563421782016',
        createdAt: '2024-09-10T01:50:08.050Z',
        updatedAt: '2024-09-10T01:50:08.050Z',
    },
    {
        id: 'db21a257-105b-4404-9a6d-62afa0cd1bb7',
        clientId: '94de0914-cf51-47a4-8234-812824d9848a',
        title: 'Mawaddah Indonesia',
        photo: 'https://picsum.photos/seed/fCiD1hdDV/640/480',
        createdAt: '2024-09-10T01:50:08.068Z',
        updatedAt: '2024-09-10T01:50:08.068Z',
    },
];
