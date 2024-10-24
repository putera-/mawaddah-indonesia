import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateIbadahDto } from './dto/create-ibadah.dto';
import { applyDecorators } from '@nestjs/common';


export function GetIbadahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Ibadah, Restricted for Member' }),

        ApiResponse({
            status: 200,
            description: 'Value of Ibadah.',
            schema: {
                example: sampleIbadah1
            }
        }),
    );
}

export function PatchIbadahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create New Ibadah, Restricted for Member' }),
        ApiBody({
            type: CreateIbadahDto
        }),
        ApiResponse({
            status: 201,
            description: 'Ibadah berhasil dibuat.',

            schema: {
                example: sampleIbadah1
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',

        }),
    );
}

const sampleIbadah1 = {
	"id": "b26db04d-1413-42d4-bcdf-b52326241568",
	"shalat_fardu": "rutin_di_masjid",
	"shalat_rawatib": "kadang_kadang",
	"shalat_dhuha": "kadang_kadang",
	"shalat_tahajud": "rutin",
	"puasa_ramadhan": "rutin",
	"puasa_senin_kamis": "kadang_kadang",
	"puasa_daud": "kadang_kadang",
	"puasa_ayamul_bid": "pernah_sekali",
	"zakat": "rutin",
	"sedekah": "pernah_sekali",
	"umrah": "belum_pernah",
	"haji": false,
	"biodataId": "b3ac4e99-b008-4abc-a7ad-a6c2f83dfbaf",
	"createdAt": "2024-09-23T02:12:46.185Z",
	"updatedAt": "2024-10-04T02:16:23.401Z"
}
