import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePhysicalCharDto } from './dto/create-physical_char.dto';


export function GetPhysicalCharsDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Physical characteristic, Restricted for Member' }),

        ApiResponse({
            status: 200,
            description: 'Value of Physical characteristic.',
            schema: {
                example: { samplePhysicalChars }
            }
        }),
    );
}

export function PatchPhysicalCharsDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create New Physical characteristic, Restricted for Member' }),
        ApiBody({
            type: CreatePhysicalCharDto
        }),
        ApiResponse({
            status: 201,
            description: 'Physical characteristic berhasil dibuat.',
            schema: {
                example: samplePhysicalChars
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',

        }),
    );
}

const samplePhysicalChars = {
    "id": "bbbcb64b-3634-48af-9668-0cdee126d0ef",
    "height": 188,
    "weight": 81,
    "body_shape": "normal",
    "skin_color": "putih",
    "hair_color": "hitam",
    "hair_type": "lurus",
    "eye_color": "coklat",
    "characteristic": true,
    "characteristic_detail": "apalah",
    "medical_history": false,
    "medical_history_detail": null,
    "createdAt": "2024-09-23T02:12:07.240Z",
    "updatedAt": "2024-10-03T02:01:39.974Z",
    "biodataId": "b3ac4e99-b008-4abc-a7ad-a6c2f83dfbaf"
}
