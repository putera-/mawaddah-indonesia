import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetLandingPageDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Landing Page, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}

export function CreateMainSlideDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Main Slide, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}
export function UpdateMainSlideDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Main Slide, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}
export function CreateProcessStepDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Process Step, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}
export function UpdateProcessStepDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Process Step, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}

export function UpdateAboutDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update About, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}

export function CreateSocialMediaDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Social Media, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}
export function UpdateSocialMediaDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Social Media, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}
export function CreateBlogDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Blog, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}
export function UpdateBlogDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Blog, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                // example: sampleLandingPage
            },
        }),
    );
}
