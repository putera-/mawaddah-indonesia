import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function GetAllAnswerDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Answer, Restricted for Member' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: { sampleAnswers },
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

export function GetAnswerDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Answer By Id, Restricted for Member' }),
        ApiQuery({
            name: 'question-id',
            required: true,
            type: String,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: { sampleAnswer },
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
        ApiResponse({
            status: 403,
            description: 'Error: Forbidden',
            schema: {
                example: {
                    message:
                        'Biodata is not found, please create biodata first',
                    statusCode: 403,
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Question is not found!',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function PatchAnswerDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Edit Answer By ID, Restricted for Member' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    id: 'b9a143c3-ec9c-42c9-9427-498f23c61a29',
                    biodataId: 'd04d7c58-07db-4c1b-9c55-78b4faca31ba',
                    questionId: '2586b019-7514-49f9-9351-868450c1c8e2',
                    answer: 'update jawaban',
                    createdAt: '2024-09-17T03:02:09.428Z',
                    updatedAt: '2024-09-24T02:24:11.807Z',
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
        ApiResponse({
            status: 403,
            description: 'Error: Forbidden',
            schema: {
                example: {
                    message:
                        'Biodata is not found, please create biodata first',
                    statusCode: 403,
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: '',
                    statusCode: 401,
                },
            },
        }),
    );
}

const sampleAnswers = [
    {
        id: '2586b019-7514-49f9-9351-868450c1c8e2',
        question:
            'Bagaimana cara Anda mengatasi perbedaan pendapat dalam suatu diskusi dengan pasangan?',
        deleted: false,
        userId: '48a4e509-bb9f-4339-84d0-41ebcff7e58a',
        createdAt: '2024-09-17T02:47:51.335Z',
        updatedAt: '2024-09-17T02:47:51.335Z',
        answer: {
            id: 'b9a143c3-ec9c-42c9-9427-498f23c61a29',
            biodataId: 'd04d7c58-07db-4c1b-9c55-78b4faca31ba',
            questionId: '2586b019-7514-49f9-9351-868450c1c8e2',
            answer: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Id ultricies morbi hac nullam cursus iaculis.',
            createdAt: '2024-09-17T03:02:09.428Z',
            updatedAt: '2024-09-17T03:02:09.428Z',
        },
    },
    {
        id: '78ad2586-1600-4e7c-b2cf-c9cc4c1a9950',
        question:
            'Seberapa sering Anda ingin melakukan diskusi mendalam tentang hubungan Anda dengan pasangan?',
        deleted: false,
        userId: '48a4e509-bb9f-4339-84d0-41ebcff7e58a',
        createdAt: '2024-09-17T02:47:51.353Z',
        updatedAt: '2024-09-17T02:47:51.353Z',
        answer: {
            id: 'e08c54fd-3240-4e83-aa5a-08c3e7cc39e4',
            biodataId: 'd04d7c58-07db-4c1b-9c55-78b4faca31ba',
            questionId: '78ad2586-1600-4e7c-b2cf-c9cc4c1a9950',
            answer: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Id ultricies morbi hac nullam cursus iaculis.',
            createdAt: '2024-09-17T03:02:09.428Z',
            updatedAt: '2024-09-17T03:02:09.428Z',
        },
    },
];

const sampleAnswer = {
    id: '2586b019-7514-49f9-9351-868450c1c8e2',
    question:
        'Bagaimana cara Anda mengatasi perbedaan pendapat dalam suatu diskusi dengan pasangan?',
    deleted: false,
    userId: '48a4e509-bb9f-4339-84d0-41ebcff7e58a',
    createdAt: '2024-09-17T02:47:51.335Z',
    updatedAt: '2024-09-17T02:47:51.335Z',
    answer: {
        id: 'b9a143c3-ec9c-42c9-9427-498f23c61a29',
        biodataId: 'd04d7c58-07db-4c1b-9c55-78b4faca31ba',
        questionId: '2586b019-7514-49f9-9351-868450c1c8e2',
        answer: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Id ultricies morbi hac nullam cursus iaculis.',
        createdAt: '2024-09-17T03:02:09.428Z',
        updatedAt: '2024-09-17T03:02:09.428Z',
    },
};
