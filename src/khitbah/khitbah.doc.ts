import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';

export function GetAllKhitbahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Khitbah, Restricted for Member' }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Limit of Khitbah',
        }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page of Khitbah',
        }),
        ApiResponse({
            status: 200,
            description: 'List of Khitbah.',
            schema: {
                example: { sampleKhitbah4 }
            }
        }),
    );
}

export function GetByIdKhitbahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get One Khitbah, Restricted for Member' }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'ID of Khitbah',
        }),
        ApiResponse({
            status: 200,
            description: 'Khitbah detail.',
            schema: {
                example: { sampleKhitbah1 }
            }
        }),
    );
}


export function CreateKhitbahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create New Khitbah, Restricted for Member' }),
        ApiBody({
            type: CreateKhitbahDto
        }),
        ApiParam({
            name: 'taarufid',
            required: true,
            type: String,
            description: 'ID of Taaruf',
        }),
        ApiResponse({
            status: 201,
            description: 'Khitbah berhasil dibuat.',
            schema: {
                example: {
                    "message": "ayo lanjut ke Khitbah",
                    "schedule": "2024-05-28T20:16:17.982Z"
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
            schema: {
                example: {
                    message: 'Taaruf gagal dibuat',
                    statusCode: 400,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401,
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Data taaruf tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function UpdateKhitbahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Khitbah Date, Restricted for Member' }),
        ApiBody({
            type: CreateKhitbahDto
        }),
        ApiParam({
            name: 'Khitbahid',
            required: true,
            type: String,
            description: 'ID of Khitbah',
        }),
        ApiResponse({
            status: 200,
            description: 'Khitbah berhasil diperbarui.',
            schema: {
                example: { sampleKhitbah1 },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401,
                },
            },
        }),
    );
}

export function CancelKhitbahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Cancel Khitbah, Restricted for Member' }),
        ApiParam({
            name: 'Khitbahid',
            required: true,
            type: String,
            description: 'ID of Khitbah',
        }),
        ApiResponse({
            status: 200,
            description: 'Khitbah berhasil dibatalkan.',
            schema: {
                example: { sampleKhitbah3 },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401,
                },
            },
        }),
    );
}
export function ApproveKhitbahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Approve Khitbah, Restricted for Member' }),
        ApiParam({
            name: 'Khitbahid',
            required: true,
            type: String,
            description: 'ID of Khitbah',
        }),
        ApiResponse({
            status: 200,
            description: 'Khitbah berhasil disetujui.',
            schema: {
                example: { sampleKhitbah1 },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401,
                },
            },
        }),
    );
}
export function RejectKhitbahDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Reject Khitbah, Restricted for Member' }),
        ApiParam({
            name: 'Khitbahid',
            required: true,
            type: String,
            description: 'ID of Khitbah',
        }),
        ApiResponse({
            status: 200,
            description: 'Khitbah berhasil ditolak.',
            schema: {
                example: { sampleKhitbah2 },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'ID Taaruf tidak ditemukan',
                    error: 'Not Found',
                    statusCode: 404,
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Error: Unauthorized',
            schema: {
                example: {
                    message: 'Unauthorized',
                    statusCode: 401,
                },
            },
        }),
    );
}

const sampleKhitbah1 = {
    id: "bf4c58c4-0919-4d16-9d75-83895edffc1c",
    taarufId: "25efcb6f-802e-419d-9a78-a75f000537d8",
    schedule: "2024-05-28T20:16:17.982Z",
    status: "Yes",
    message: "ayo lanjut ke Khitbah",
    reply: "iya ayo",
    createdAt: "2024-10-01T01:43:53.918Z",
    updatedAt: "2024-10-01T01:47:57.929Z"

};

const sampleKhitbah2 = {
    id: "bf4c58c4-0919-4d16-9d75-83895edffc1c",
    taarufId: "25efcb6f-802e-419d-9a78-a75f000537d8",
    schedule: "2024-05-28T20:16:17.982Z",
    status: "No",
    message: "ayo lanjut ke Khitbah",
    reply: "Maaf aku ga bisa",
    createdAt: "2024-10-01T01:43:53.918Z",
    updatedAt: "2024-10-01T01:47:57.929Z"

};

const sampleKhitbah3 = {
    id: "bf4c58c4-0919-4d16-9d75-83895edffc1c",
    taarufId: "25efcb6f-802e-419d-9a78-a75f000537d8",
    schedule: "2024-05-28T20:16:17.982Z",
    status: "No",
    message: "maaf aku ga jadi",
    reply: "",
    createdAt: "2024-10-01T01:43:53.918Z",
    updatedAt: "2024-10-01T01:47:57.929Z"

};

const sampleKhitbah4 = [
    {
        "id": "49d1a39f-bcbc-4869-b6f9-ba2a5659c695",
        "userId": "0005fbff-1213-4ac4-9afb-03c0bbe72f2b",
        "candidateId": "6cb299a5-3a29-41d8-b607-b3590ecd2348",
        "status": true,
        "message": "Mari bertaaruf",
        "createdAt": "2024-09-23T02:17:00.257Z",
        "updatedAt": "2024-09-23T02:17:00.257Z",
        "approval": {
            "id": "f81420cf-694c-4157-8228-429cc792b114",
            "taarufId": "49d1a39f-bcbc-4869-b6f9-ba2a5659c695",
            "status": "Pending",
            "message": "",
            "reply": "",
            "updatedAt": "2024-09-23T02:17:00.257Z"
        },
        "khitbahs": [],
        "Khitbahs": []
    },
    {
        "id": "25efcb6f-802e-419d-9a78-a75f000537d8",
        "userId": "0005fbff-1213-4ac4-9afb-03c0bbe72f2b",
        "candidateId": "0005fbff-1213-4ac4-9afb-03c0bbe72f2b",
        "status": true,
        "message": "Assalamualaikum, ukhti",
        "createdAt": "2024-09-27T02:04:05.695Z",
        "updatedAt": "2024-09-27T02:04:05.695Z",
        "approval": {
            "id": "7641f63b-f7c1-4cf4-a18d-0ad138e4f9a5",
            "taarufId": "25efcb6f-802e-419d-9a78-a75f000537d8",
            "status": "Yes",
            "message": "iya ayo",
            "reply": "",
            "updatedAt": "2024-09-27T02:11:06.478Z"
        },
        "khitbahs": [
            {
                "id": "0a737216-a478-4847-9041-4632a1c82adf",
                "taarufId": "25efcb6f-802e-419d-9a78-a75f000537d8",
                "schedule": "2024-05-28T20:16:17.982Z",
                "status": "Yes",
                "message": "ayo kenalan",
                "reply": "",
                "createdAt": "2024-09-27T02:20:37.789Z",
                "updatedAt": "2024-09-27T02:30:58.058Z"
            }
        ],
        "Khitbahs": [
            {
                "id": "7cca13aa-52c3-4283-8450-9960987cfd7d",
                "taarufId": "25efcb6f-802e-419d-9a78-a75f000537d8",
                "schedule": "2024-05-28T20:16:17.982Z",
                "status": "Pending",
                "message": "ayo lanjut ke Khitbah",
                "reply": "",
                "createdAt": "2024-09-27T02:31:19.996Z",
                "updatedAt": "2024-09-27T02:31:19.996Z"
            },
            {
                "id": "bf4c58c4-0919-4d16-9d75-83895edffc1c",
                "taarufId": "25efcb6f-802e-419d-9a78-a75f000537d8",
                "schedule": "2024-05-28T20:16:17.982Z",
                "status": "Yes",
                "message": "ayo lanjut ke Khitbah",
                "reply": "",
                "createdAt": "2024-10-01T01:43:53.918Z",
                "updatedAt": "2024-10-01T01:47:57.929Z"
            },
            {
                "id": "23e3fda7-339a-4f2c-b190-e21753340e40",
                "taarufId": "25efcb6f-802e-419d-9a78-a75f000537d8",
                "schedule": "2024-05-28T20:16:17.982Z",
                "status": "Pending",
                "message": "ayo lanjut ke Khitbah",
                "reply": "",
                "createdAt": "2024-10-01T01:54:15.288Z",
                "updatedAt": "2024-10-01T01:54:57.672Z"
            }
        ]
    }
]


