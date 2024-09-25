import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CreateEducationDto } from "./dto/create-education.dto";


export function CreateEducationDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Education, Restricted for Member' }),
        ApiBody({
            type: CreateEducationDto
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    limit: 2,
                    total: 100,
                    page: 1,
                    maxPages: 12,
                    data: {
                        sample1, sample2
                    }
                }
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


export function GetEducationAll() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Education, Restricted for Member' }),
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
                    limit: 1,
                    total: 1,
                    page: 1,
                    maxPages: 12,
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

export function GetEducationById() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Education By Id, Restricted for Member' }),
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

export function UpdateEducationById() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Education By Id, Restricted for Member' }),
        ApiBody({
            type: CreateEducationDto
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

export function DeleteEducationById() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Education By Id, Restricted for Member' }),
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

const sample1 = {
	"id": "8f2acb5e-23a8-464b-951c-c68487a659b4",
	"institution_name": "Fountain Magic Academy",
	"major": null,
	"degree": "Senior Highschool",
	"city": "mondtstald",
	"startYear": 2000,
	"endYear": null,
	"createdAt": "2024-09-24T01:59:26.762Z",
	"updatedAt": "2024-09-24T02:00:37.602Z"
}

const sample2 = {
	"id": "8f2acb5e-23a8-464b-951c-c35453a659b4",
	"institution_name": "Harlord Magic Academy",
	"major": null,
	"degree": "Senior Highschool",
	"city": "Manchester",
	"startYear": 2008,
	"endYear": null,
	"createdAt": "2024-09-24T01:59:26.762Z",
	"updatedAt": "2024-09-24T02:00:37.602Z"
}
