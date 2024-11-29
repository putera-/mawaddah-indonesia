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
export function UpdateMainSlideDoc() {
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
export function CreateProcessStepDoc() {
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
export function UpdateProcessStepDoc() {
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

export function UpdateAboutDoc(){
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

export function CreateSocialMediaDoc() {
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
export function UpdateSocialMediaDoc() {
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
export function CreateBlogDoc() {
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
export function UpdateBlogDoc() {
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
