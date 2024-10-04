import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CreateProvinceDto } from "./dto/create-province.dto";


export function CreateProvinceDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Province, Restricted for Superadmin and Admin' }),
        ApiBody({
            type: CreateProvinceDto
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


export function GetProvinceAll() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Province, Restricted for Member, Superadmin and Admin' }),
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
                    limit: 4,
                    total: 10,
                    page: 1,
                    maxPages: 3,
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

export function GetProvinceById() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Province By Id, Restricted for Member, Superadmin and Admin' }),
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

export function UpdateProvinceById() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Province By Id, Restricted for Superadmin and Admin' }),
        ApiBody({
            type: CreateProvinceDto
        }),
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

export function DeleteProvinceById() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Province By Id, Restricted for Superadmin and Admin' }),
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
        "id": "d8a82489-dd36-4b11-af53-d365b355a5dd",
        "name": "Bali",
        "deleted": false
    },
    {
        "id": "8c17720d-0d4b-4959-8a00-261e1cca0f4a",
        "name": "Bangka Belitung",
        "deleted": false
    },
    {
        "id": "7a10af6c-0323-42d6-8ddf-686c3881d031",
        "name": "Banten",
        "deleted": false
    },
    {
        "id": "fdbc7417-fefc-4e57-ac7d-a0def93a601c",
        "name": "Bengkulu",
        "deleted": false
    },
    {
        "id": "f4cf5ab9-cf6d-4baf-b164-725926b0d5eb",
        "name": "DI Yogyakarta",
        "deleted": false
    },
]

const sample2 = {
    "id": "d8a82489-dd36-4b11-af53-d365b355a5dd",
    "name": "Bali",
    "deleted": false
}

