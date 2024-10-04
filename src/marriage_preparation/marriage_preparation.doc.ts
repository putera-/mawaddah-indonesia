import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMarriagePreparationDto } from './dto/create-marriage_preparation.dto';


export function GetMarriagePreparationsDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Marriage Preparation, Restricted for Member' }),

        ApiResponse({
            status: 200,
            description: 'Value of Marriage Preparation.',
            schema: {
                example: sampleMarriagePreparations1
            }
        }),
    );
}

export function PatchMarriagePreparationsDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create New Marriage Preparation, Restricted for Member' }),
        ApiBody({
            type: CreateMarriagePreparationDto
        }),
        ApiResponse({
            status: 201,
            description: 'Marriage Preparation berhasil dibuat.',

            schema: {
                example: sampleMarriagePreparations1
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',

        }),
    );
}

const sampleMarriagePreparations1 = {
    "id": "46110a45-781d-44d3-b326-ad511b7a5ed8",
    "biodataId": "b3ac4e99-b008-4abc-a7ad-a6c2f83dfbaf",
    "visi": "untuk mengusai dunia",
    "misi": "menguasai dunia dengan cara sendiri",
    "mental": "ragu ragu",
    "mahar": "BMW XM",
    "cost": "800.000.000",
    "span_time": "5 bulan",
    "createdAt": "2024-09-23T02:11:22.680Z",
    "updatedAt": "2024-10-04T02:06:49.315Z"
}
