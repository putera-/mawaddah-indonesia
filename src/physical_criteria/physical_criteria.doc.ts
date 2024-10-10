import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePhysicalCriteriaDto } from './dto/update-physical_criteria.dto';

export function GetPhysicalCriteriaByIdDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Physical Criteria By Id. Restricted for Member',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: samplePhysicalCriteria,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Silakan isi biodata terlebih dahulu',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function UpdatePhysicalCriteriaDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Physical Criteria By Id. Restricted for Member',
        }),
        ApiBody({
            type: UpdatePhysicalCriteriaDto,
         }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: samplePhysicalCriteria,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Silakan isi biodata terlebih dahulu',
                    statusCode: 404,
                },
            },
        }),
    );
}

const samplePhysicalCriteria = {
    id: 'e257b529-ebf3-4a8b-8b24-83aae8869cc3',
    height: 181,
    weight: 118,
    body_shape: 'gemuk',
    skin_color: 'putih_kemerahan',
    hair_color: 'pirang',
    hair_type: 'kribo',
    eye_color: 'coklat',
    biodataId: '4ac17763-dc55-473e-afa5-eb33faeb693a',
    createdAt: '2024-09-10T01:52:02.580Z',
    updatedAt: '2024-09-10T01:52:02.580Z',
};
