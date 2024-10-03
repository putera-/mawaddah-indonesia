import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateLifeGoalDto } from './dto/create-life_goal.dto';


export function GetLifeGoalDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Life Goal, Restricted for Member' }),

        ApiResponse({
            status: 200,
            description: 'Value of Life Goal.',
            schema: {
                example: { sampleLifeGoal2 }
            }
        }),
    );
}

export function PatchLifeGoalDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create New Life Goal, Restricted for Member' }),
        ApiBody({
            type: CreateLifeGoalDto
        }),
        ApiResponse({
            status: 201,
            description: 'Life Goal berhasil dibuat.',
            schema: {
                example: sampleLifeGoal1
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',

        }),
    );
}

const sampleLifeGoal1 = {
    "career": "M101A1 105 mm HE-rounds howitzer Operator",
    "domicile": "North Kirafort",
    "child_count": "2",
    "child_education": "Corporate Operations Engineer",
    "financial_arrangement": "suami",
    "knowledge_upgrade": "Mengoprasikan 152 mm howitzer 2A65 Msta-B"
}

const sampleLifeGoal2 = {
    "id": "97db8c46-680e-4956-a277-ee208b4c8ecd",
    "career": "M101A1 105 mm HE-rounds howitzer Operator",
    "domicile": "North Kirafort",
    "child_count": "2",
    "child_education": "Corporate Operations Engineer",
    "financial_arrangement": "suami",
    "knowledge_upgrade": "Mengoprasikan 152 mm howitzer 2A65 Msta-B",
    "short_term_achievement": "Mengurangi berat badan sesuai target",
    "long_term_achievement": "Menulis dan menerbitkan buku",
    "wife_work_permit": true,
    "wife_work_permit_desc": "boleh",
    "createdAt": "2024-09-23T02:18:40.469Z",
    "updatedAt": "2024-10-03T01:27:17.378Z",
    "biodataId": "b3ac4e99-b008-4abc-a7ad-a6c2f83dfbaf"
}
