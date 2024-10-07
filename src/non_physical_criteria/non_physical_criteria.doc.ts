import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetNonPhysicalCriteriaDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Non-Physical Criteria, Restricted for Member',
        }),
        ApiResponse({
            status: 200,
            description: 'success',
            schema: {
                example: { sampleNonPhysicalCriteria },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Error : Bad Request.',
            schema: {
                example: {
                    statusCode: 400,
                    message: 'Silakan isi biodata terlebih dahulu.',
                },
            },
        }),
    );
}

export function UpdateNonPhysicalCriteriaDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Non-Physical Criteria, Restricted for Member',
        }),
        ApiResponse({
            status: 200,
            description: 'success',
            schema: {
                example: { sampleNonPhysicalCriteria },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Error : Bad Request.',
            schema: {
                example: {
                    statusCode: 400,
                    message: 'Silakan isi biodata terlebih dahulu.',
                },
            },
        }),
    );
}

const sampleNonPhysicalCriteria = {
    id: '2ab3c898-1711-44dc-a15c-a860494a2f7a',
    age: 27,
    domicile: 'Sulawesi Tengah',
    education: 'S2',
    married_status: 'LAJANG',
    sport: 'Lari, Bermain rugby',
    hobby: 'Mengikuti acara keagamaan, Mengembangkan kemampuan',
    traits: 'Peduli, Peduli, Fleksibel',
    ethnic: 'Mentawai',
    job: 'Pengacara',
    other: 'Ingin berpasangan dengan seseorang yang memiliki kemampuan beradaptasi dan fleksibel, Ingin berpasangan dengan seseorang yang memiliki kemampuan memimpin dan menginspirasi, Menginginkan pasangan yang dapat menjadi partner dalam meningkatkan kualitas ibadah',
    biodataId: '4ac17763-dc55-473e-afa5-eb33faeb693a',
    createdAt: '2024-09-10T01:52:56.883Z',
    updatedAt: '2024-09-10T01:52:56.883Z',
};
