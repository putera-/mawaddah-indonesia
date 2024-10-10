import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function CreateQuestionDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Question, Restricted for Admin and Superadmin' }),
        ApiBody({
            // type: CreateQuestionDto
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sample1
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


export function GetQuestionAll() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Question, Restricted for Admin and Superadmin' }),
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
                    total: 100,
                    page: 1,
                    maxPages: 11,
                    data: {
                        sample2
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
        }),
        ApiResponse({
            status: 403,
            description: "Forbidden Resource",
            schema: {
                example: {
                    message: 'Forbidden Resource',
                    statusCode: 403
                }
            }
        })
    )
}

export function GetQuestionById() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Question By Id, Restricted for Admin and Superadmin' }),
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
        }),
        ApiResponse({
            status: 403,
            description: "Forbidden Resource",
            schema: {
                example: {
                    message: 'Forbidden Resource',
                    statusCode: 403

                }
            }
        })
    )
}

export function UpdateQuestionById() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Question By Id, Restricted for Admin and Superadmin' }),
        ApiBody({
            // type: CreateQuestionDto
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
        }),
        ApiResponse({
            status: 403,
            description: "Forbidden Resource",
            schema: {
                example: {
                    message: 'Forbidden Resource',
                    statusCode: 403

                }
            }
        })
    )
}

export function DeleteQuestionById() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Question By Id, Restricted for Admin and Superadmin' }),
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
        }),
        ApiResponse({
            status: 403,
            description: "Forbidden Resource",
            schema: {
                example: {
                    message: 'Forbidden Resource',
                    statusCode: 403

                }
            }
        })
    )
}

const sample1 = {
    "id": "79dcfde7-e76f-4876-aff5-4dd5c3e84938",
    "question": "Bagaimana cara Anda mengatasi perbedaan pendapat dalam suatu diskusi dengan pasangan?",
    "deleted": false,
    "userId": "01426eb3-6bd6-4970-9fe5-b8ea1fda8109",
    "createdAt": "2024-10-10T02:38:20.161Z",
    "updatedAt": "2024-10-10T02:38:20.161Z"

}

const sample2 = [
    {
        "id": "3b2de564-46f8-4906-be38-412607d25f40",
        "question": "Bagaimana cara Anda mengatasi perbedaan pendapat dalam suatu diskusi dengan pasangan?",
        "deleted": false,
        "userId": "62cbd57e-708b-40a0-8851-f3c952aa917a",
        "createdAt": "2024-10-08T01:31:43.200Z",
        "updatedAt": "2024-10-08T01:31:43.200Z"
    },
    {
        "id": "ca114832-e16b-4f79-9356-343c89c9a3ec",
        "question": "Seberapa sering Anda ingin melakukan diskusi mendalam tentang hubungan Anda dengan pasangan?",
        "deleted": false,
        "userId": "62cbd57e-708b-40a0-8851-f3c952aa917a",
        "createdAt": "2024-10-08T01:31:43.230Z",
        "updatedAt": "2024-10-08T01:31:43.230Z"
    },
    {
        "id": "2e15314b-cc17-4b85-90e2-a568e535a3af",
        "question": "Bagaimana cara Anda Adminikan and Superadmin kritik atau masukan kepada pasangan tanpa menyakiti perasaannya?",
        "deleted": false,
        "userId": "62cbd57e-708b-40a0-8851-f3c952aa917a",
        "createdAt": "2024-10-08T01:31:43.254Z",
        "updatedAt": "2024-10-08T01:31:43.254Z"
    },

]
