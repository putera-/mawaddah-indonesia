import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

export function getAllMemberStatDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Member Doc. Restricted to Superadmin and Admin',
        }),
        ApiQuery({
            name: 'range',
            type: Number,
            required: false,
            description: 'Number of days to look back for members by date.',
            example: 30,
        }),
        ApiQuery({
            name: 'max_days',
            type: Number,
            required: false,
            description: 'Number of days to check for active members.',
            example: 7,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    newMembers: 67,
                    membersByDate: [
                        {
                            date: '2024-11-12',
                            count: 52,
                        },
                        {
                            date: '2024-11-11',
                            count: 50,
                        },
                        {
                            date: '2024-11-10',
                            count: 0,
                        },
                        {
                            date: '2024-11-09',
                            count: 0,
                        },
                        {
                            date: '2024-11-08',
                            count: 0,
                        },
                        {
                            date: '2024-11-07',
                            count: 0,
                        },
                        {
                            date: '2024-11-06',
                            count: 0,
                        },
                        {
                            date: '2024-11-05',
                            count: 0,
                        },
                        {
                            date: '2024-11-04',
                            count: 0,
                        },
                        {
                            date: '2024-11-03',
                            count: 0,
                        },
                        {
                            date: '2024-11-02',
                            count: 0,
                        },
                        {
                            date: '2024-11-01',
                            count: 1,
                        },
                        {
                            date: '2024-10-31',
                            count: 4,
                        },
                        {
                            date: '2024-10-30',
                            count: 12,
                        },
                        {
                            date: '2024-10-29',
                            count: 7,
                        },
                        {
                            date: '2024-10-28',
                            count: 9,
                        },
                        {
                            date: '2024-10-27',
                            count: 13,
                        },
                        {
                            date: '2024-10-26',
                            count: 10,
                        },
                        {
                            date: '2024-10-25',
                            count: 12,
                        },
                        {
                            date: '2024-10-24',
                            count: 14,
                        },
                        {
                            date: '2024-10-23',
                            count: 7,
                        },
                        {
                            date: '2024-10-22',
                            count: 10,
                        },
                        {
                            date: '2024-10-21',
                            count: 6,
                        },
                        {
                            date: '2024-10-20',
                            count: 6,
                        },
                        {
                            date: '2024-10-19',
                            count: 8,
                        },
                        {
                            date: '2024-10-18',
                            count: 13,
                        },
                        {
                            date: '2024-10-17',
                            count: 12,
                        },
                        {
                            date: '2024-10-16',
                            count: 5,
                        },
                        {
                            date: '2024-10-15',
                            count: 10,
                        },
                        {
                            date: '2024-10-14',
                            count: 9,
                        },
                    ],
                    allMembers: 820,
                    activeMembers: 1,
                    byTaaruf: 196,
                    byNadhar: 18,
                    byKhitbah: 1,
                    byAkad: 0,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
    );
}

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

export function getByDateDoc() {
    return applyDecorators(
        ApiOperation({
            summary:
                'Get All Member By Date Doc. Restricted to Superadmin and Admin',
        }),
        ApiQuery({
            name: 'range',
            type: Number,
            required: false,
            description: 'Number of days to look back for members by date.',
            example: 30,
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
        ApiQuery({
            name: 'max_days',
            type: Number,
            required: false,
            description: 'Number of days to check for active members.',
            example: 7,
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
        ApiQuery({
            name: 'process',
            type: String,
            required: false,
            description: 'Process to check.',
            example: 7,
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
