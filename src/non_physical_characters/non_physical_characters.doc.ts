import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNonPhysicalCharacterDto } from './dto/create-non_physical_character.dto';


export function GetnonPhysicalDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Non-Phyical chars, Restricted for Member' }),

        ApiResponse({
            status: 200,
            description: 'Value of Non-Phyical chars.',
            schema: {
                example: { sampleNonPhysicalChars2 }
            }
        }),
    );
}

export function PatchnonPhysicalDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create New Non-Phyical chars, Restricted for Member' }),
        ApiBody({
            type: CreateNonPhysicalCharacterDto
        }),
        ApiResponse({
            status: 201,
            description: 'Non-Phyical chars berhasil dibuat.',
            schema: {
                example: sampleNonPhysicalChars1
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',

        }),
    );
}

const sampleNonPhysicalChars1 = {
	"motto": "indenpendentionist, never fully rely on someone",
	"life_goal": "be useful to other people and society",
	"hobby": "writing",
	"spare_time_activity": "learn or improve a (new) skill",
	"positive_traits": "diligent, indulgent, kids-friendly, neat, and thoughtful, ambitious",
	"negative_traits": "jealous, hot-headed(certain condition), tone-deaf(sometimes)",
	"liked_things": "i love writing, gardening, and imaginate",
	"unliked_things": "i hate wasting my time on stupid things",
	"drink_alcohol": false,
	"smoking": false
}
const sampleNonPhysicalChars2 = {
   "id": "854fc9b1-f185-4eaf-bbe8-ff6cbb250cdc",
	"motto": "indenpendentionist, never fully rely on someone",
	"life_goal": "be useful to other people and society",
	"hobby": "writing",
	"spare_time_activity": "learn or improve a (new) skill",
	"positive_traits": "diligent, indulgent, kids-friendly, neat, and thoughtful, ambitious",
	"negative_traits": "jealous, hot-headed(certain condition), tone-deaf(sometimes)",
	"liked_things": "i love writing, gardening, and imaginate",
	"unliked_things": "i hate wasting my time on stupid things",
	"drink_alcohol": false,
	"smoking": false,
	"sport": null,
	"createdAt": "2024-09-23T02:11:22.680Z",
	"updatedAt": "2024-10-03T02:37:50.840Z",
	"biodataId": "b3ac4e99-b008-4abc-a7ad-a6c2f83dfbaf"
}
