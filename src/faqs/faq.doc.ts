import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CreateFaqDto } from "./dto/create-faq.dto";

export function CreateFaqDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Faq, Restricted for Member' }),
        ApiBody({
            type: CreateFaqDto
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sample2

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
        )
    );
}

export function GetFaqAll() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Faq, Restricted for Member' }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page number'
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Number of item per page'
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    limit: 3,
                    total: 3,
                    page: 1,
                    maxPages: 1,
                    data: {
                        sample1
                    }
                }
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}

export function GetFaqById() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Faq By Id, Restricted for Member' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sample2
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}

export function UpdateFaqById() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Faq By Id, Restricted for Member' }),
        ApiBody({
            type: CreateFaqDto
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sample1
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}

export function DeleteFaqById() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Faq By Id, Restricted for Member' }),
        ApiResponse({
            status: 204,
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized (you need to login to see this content)',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Not Found',
                    statusCode: 404
                }
            }
        })
    )
}


const sample1 = [
    {
        "id": "f80b32d6-9c35-4b4c-8db2-ff0eab1cef96",
        "clientId": "94de0914-cf51-47a4-8234-812824d9848a",
        "question": "sketch",
        "answer": "scared elevation",
        "deleted": false,
        "createdAt": "2018-04-07T08:30:58.398Z",
        "updatedAt": "2024-10-29T03:33:37.708Z"
    },
    {
        "id": "0623d349-d687-4551-b007-63071f770d6b",
        "clientId": "94de0914-cf51-47a4-8234-812824d9848a",
        "question": "hmph flimsy",
        "answer": "thread boohoo unbearably",
        "deleted": false,
        "createdAt": "2024-04-03T02:39:47.208Z",
        "updatedAt": "2024-10-29T09:12:39.051Z"
    },
    {
        "id": "7e163fcf-a181-45ad-9cdb-0c4aa256c805",
        "clientId": "94de0914-cf51-47a4-8234-812824d9848a",
        "question": "far fairly",
        "answer": "depreciate milepost",
        "deleted": false,
        "createdAt": "2019-05-18T07:12:02.829Z",
        "updatedAt": "2024-10-29T03:40:59.790Z"
    },
]

const sample2 = {
    "id": "f80b32d6-9c35-4b4c-8db2-ff0eab1cef96",
    "clientId": "94de0914-cf51-47a4-8234-812824d9848a",
    "question": "sketch",
    "answer": "scared elevation",
    "deleted": false,
    "createdAt": "2018-04-07T08:30:58.398Z",
    "updatedAt": "2024-10-29T03:33:37.708Z"
}

