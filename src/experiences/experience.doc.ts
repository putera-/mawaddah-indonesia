import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { sample } from "rxjs";
import { CreateExperienceDto } from "./dto/create-experience.dto";


export function CreateExperienceDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Experience, Restricted for Member' }),
        ApiBody({
            type: CreateExperienceDto
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

export function GetExperiemceAll() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Experience, Restricted for Member' }),
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

export function GetExperiemceById() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Experience By Id, Restricted for Member' }),
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

export function UpdateExperienceById() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Experience By Id, Restricted for Member' }),
        ApiBody({
            type: CreateExperienceDto
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

export function DeleteExperienceById() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Experience By Id, Restricted for Member' }),
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
    "id": "5855200b-c9e2-4ae1-aa20-bb05b5613ec0",
    "biodataId": "b3ac4e99-b008-4abc-a7ad-a6c2f83dfbaf",
    "type": "Kerja",
    "start_year": 2023,
    "end_year": 2024,
    "position": "Human Resources Manager",
    "description": "Tutis vilicus vicissitudo ver ceno tametsi acceptus aeneus coerceo tonsor. Agnosco termes congregatio reprehenderit deinde. Crur chirographum curto aequitas ver varietas cumque.\nArchitecto viriliter abundans accommodo aro theatrum tracto. Quis doloremque sed verus vitium versus denuo careo spes celer. Vesica curis maiores quisquam repellat stabilis.\nAdmoveo turba caelestis alveus. Pauci quibusdam urbs vacuus video vivo. Adaugeo bonus aqua denego.",
    "deleted": false,
    "createdAt": "2024-09-23T02:19:49.780Z",
    "updatedAt": "2024-09-23T02:19:49.780Z"
}

const sample2 = {
    "id": "b7c929be-e247-43a9-80f8-3fd1ee817272",
    "biodataId": "b3ac4e99-b008-4abc-a7ad-a6c2f83dfbaf",
    "type": "Organisasi",
    "start_year": 2024,
    "end_year": 2024,
    "position": "Data Analyst",
    "description": "Deduco compello desidero fuga cupiditate subiungo sint. Placeat tergum baiulus carpo decor cernuus sublime vulticulus vinculum. Vinitor decens derideo.\nSumptus provident creta annus velit aptus volo. Consectetur basium vomito cometes thymbra crapula aduro. Utor calculus copiose comitatus arx.\nComplectus terebro quaerat consequuntur defleo. Vicissitudo deserunt dens spiritus confido adfectus tempore complectus atavus libero. Aranea pecus campana averto pax.",
    "deleted": false,
    "createdAt": "2024-09-23T02:19:49.768Z",
    "updatedAt": "2024-09-23T02:19:49.768Z"
}

