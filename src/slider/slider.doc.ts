import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSliderDto } from './dto/create-slider.dto';


export function GetSliderDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Slider By Id, Public (Everyone are allowed to view content)' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleSlider,
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
    );
}


export function GetSliderByIdDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Slider By Id, Public (Everyone are allowed to view content)' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleSlider2,
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
    );
}

export function CreateSliderDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Slider, Admin and Superadmin only' }),
        ApiBody({
            type: CreateSliderDto
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleSlider2,
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
    );
}

export function UpdateSliderDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Edit Slider By ID, Admin and Superadmin only' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleSlider2,
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
    );
}

export function DeleteSliderDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Slider By ID, Admin and Superadmin only' }),
        ApiResponse({
            status: 204,
            description: 'Success',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
        }),
    );
}

const sampleSlider = [
    {
        "id": '007e9bf9-5920-4002-8e58-eacc6c9666a8',
        "title": "MawaddahSakinah",
        "photo": "/public/photos/1697540800099_lg.jpg",
        "createdAt": "2024-10-17T10:45:00.000Z",
        "updatedAt": "2024-10-17T10:45:00.000Z"
    },
    {
        "id": '007e9bf9-5920-4002-8e58-eacc6c9666a8',
        "title": "MawaddahSakinah",
        "photo": "/public/photos/1696340800032_lg.jpg",
        "createdAt": "2024-10-17T10:45:00.000Z",
        "updatedAt": "2024-10-17T10:45:00.000Z"
    }]

const sampleSlider2 = {
    "id": '007e9bf9-5920-4002-8e58-eacc6c9666a8',
    "title": "MawaddahSakinah",
    "photo": "/public/photos/1697540800099_lg.jpg",
    "createdAt": "2024-10-17T10:45:00.000Z",
    "updatedAt": "2024-10-17T10:45:00.000Z"
}

