import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function getNewMemberDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get New Member Doc. Restricted to Superadmin and Admin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: 10,
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
    );
}

export function getAllMemberDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Member Doc. Restricted to Superadmin and Admin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: 10,
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
    );
}

export function getActiveMemberDoc() {
    return applyDecorators(
        ApiOperation({
            summary:
                'Get All Active Member Doc. Restricted to Superadmin and Admin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: 10,
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
    );
}

export function getByRelationshipDoc() {
    return applyDecorators(
        ApiOperation({
            summary:
                'Get All Member By Relationship Doc. Restricted to Superadmin and Admin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: 10,
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
    );
}
