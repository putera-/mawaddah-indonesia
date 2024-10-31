import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function redirectDoc(){
    return applyDecorators(
        ApiOperation({ summary: 'Redirect to API documentation' }),
        ApiResponse({ status: 301, description: 'Redirect to Swagger UI' }),
    );
}

export function getPhotoDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get photo. Public' }),
        ApiParam({ name: 'file_name', type: String }),
        ApiResponse({ status: 200, description: 'Photo' }),
        ApiResponse({ status: 404, description: 'Photo not found' }),
    );
}

export function getGalleryDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get gallery. Public' }),
        ApiParam({ name: 'file_name', type: String }),
        ApiResponse({ status: 200, description: 'Gallery' }),
        ApiResponse({ status: 404, description: 'Gallery not found' }),
    );
}

export function getAvatarDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get avatar. Public' }),
        ApiParam({ name: 'file_name', type: String }),
        ApiResponse({ status: 200, description: 'Avatar' }),
        ApiResponse({ status: 404, description: 'Avatar not found' }),
    );
}

export function getDummyPhotoDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get dummy photo. Public' }),
        ApiParam({ name: 'file_name', type: String }),
        ApiResponse({ status: 200, description: 'Dummy photo' }),
        ApiResponse({ status: 404, description: 'Dummy photo not found' }),
    );
}
