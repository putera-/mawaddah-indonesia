import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CreateBiodatumDto } from "./dto/create-biodatum.dto";

export function CreateBiodataDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Biodata, Restricted for Member' }),
        ApiBody({
            type: CreateBiodatumDto
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
            example: sampleBiodata
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


export function GetBiodataDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Biodata, Restricted for Member' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sampleBiodata

        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401
                }
            }
        }),
        ApiResponse({
            status: 204,
            description: 'Biodata havent been created yet',
            schema: {
                example: {
                    message: 'No Content',
                    statusCode: 204
                }
            }

        })
    );
}

export function UpdateBiodataDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Biodata, Restricted for Member' }),
        ApiBody({
            type: CreateBiodatumDto
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sampleBiodata

        })
    )
}

const sampleBiodata = {
    id: "19a9371f-d673-442e-b85c-e4bcbb07c24d",
    userId: "03179b1e-eec4-432b-9891-93b6d0675170",
    bio: "Hi",
    phone: "+62895373026030",
    company: "Al Bashiroh Corp",
    manhaj: "SALAF",
    gender: "PRIA",
    marriage_status: "LAJANG",
    marriage_permission: "NON_POLIGAMI",
    dob: "1995-10-03T00:00:00.000Z",
    birth_place: "SOLO",
    birth_order: 1,
    address: "Tangsel",
    address_town: "JAKARTA",
    address_province: "JAKARTA",
    hometown_province: "BANTEN",
    address_zip_code: 12321,
    ethnic: "JAWA",
    poligami_opinion: "Saya sangat suka dengan poligami",
    createdAt: "2023-01-21T03:47:33.259Z",
    updatedAt: "2024-09-17T02:34:15.779Z"
}
