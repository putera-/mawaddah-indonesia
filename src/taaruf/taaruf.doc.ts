import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TaarufMessageDto } from './dto/taaruf-message.dto';

export function CreateTaarufDoc() {
    return applyDecorators(
        ApiParam({ name: 'id', required: true, type: String, description: 'ID of Candidate' }),
        ApiOperation({
            summary: 'Create Taaruf',
        }),
        ApiBody({
            type: TaarufMessageDto,
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: sampleTaaruf1
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function GetAllIncomingTaarufDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Incoming Taaruf',
        }),
        ApiResponse({
            status: 200,
            schema: {

                example: {
                    limit: 2,
                    total: 100,
                    page: 1,
                    maxPages: 12,
                    data: {
                        sampleTaaruf2
                    }
                }
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function GetAllOutgoingTaarufDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Outgoing Taaruf',
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: {
                    limit: 2,
                    total: 100,
                    page: 1,
                    maxPages: 12,
                    data: {
                        sampleTaaruf2
                    }
                }
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function GetIncomingTaarufbyIdDoc() {
    return applyDecorators(
        ApiParam({ name: 'id', required: true, type: String, description: 'ID of Taaruf' }),
        ApiOperation({
            summary: 'Get Incoming Taaruf By Id',
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: sampleTaaruf1
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function GetOutgoingTaarufbyIdDoc() {
    return applyDecorators(
        ApiParam({ name: 'id', required: true, type: String, description: 'ID of Taaruf' }),
        ApiOperation({
            summary: 'Get Outgoing Taaruf By Id',
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: sampleTaaruf1
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function CancelTaarufbyIdDoc() {
    return applyDecorators(
        ApiParam({ name: 'id', required: true, type: String, description: 'ID of Taaruf' }),
        ApiOperation({
            summary: 'Cancel Taaruf By Id',
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: sampleTaarufCancelled
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function ApproveTaarufbyIdDoc() {
    return applyDecorators(
        ApiParam({ name: 'id', required: true, type: String, description: 'ID of Taaruf' }),
        ApiOperation({
            summary: 'Accept Taaruf By Id',
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: sampleTaarufApproved
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function RejectTaarufbyIdDoc() {
    return applyDecorators(
        ApiParam({ name: 'id', required: true, type: String, description: 'ID of Taaruf' }),
        ApiOperation({
            summary: 'Reject Taaruf By Id',
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: sampleTaarufRejected
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}

export function CancelTaarufResponse () {
    return applyDecorators(
        ApiParam({ name: 'id', required: true, type: String, description: 'ID of Taaruf' }),
        ApiOperation({
            summary: 'Cancel Taaruf Response',
        }),
        ApiResponse({
            status: 200,
            schema: {
                example: sampleTaarufCancelled
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request.',
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized.',
        })
    );
}


const sampleTaaruf1 = {
    "id": "e44f9eac-25dd-4f67-b9c2-f9cae7d3b8a2",
    "userId": "00465b08-f604-4c1d-a708-cf12940be339",
    "candidateId": "007e9bf9-5920-4002-8e58-eacc6c9666a8",
    "active": true,
    "status": "Pending",
    "message": "Assalamualaikum, ukhti",
    "taaruf_process": "TaarufRequest",
    "createdAt": "2024-10-09T01:28:20.304Z",
    "updatedAt": "2024-10-09T01:28:20.304Z"
}

const sampleTaaruf2 = [
    {
        "id": "57f59761-7e1e-480d-9e23-9fa926479312",
        "userId": "00465b08-f604-4c1d-a708-cf12940be339",
        "candidateId": "331013a1-500e-4c65-a864-67dda307c90c",
        "active": true,
        "status": "Rejected",
        "message": "Mari bertaaruf",
        "taaruf_process": "TaarufRejected",
        "createdAt": "2024-10-08T01:38:31.299Z",
        "updatedAt": "2024-10-08T01:38:31.346Z"
    },
    {
        "id": "e44f9eac-25dd-4f67-b9c2-f9cae7d3b8a2",
        "userId": "00465b08-f604-4c1d-a708-cf12940be339",
        "candidateId": "007e9bf9-5920-4002-8e58-eacc6c9666a8",
        "active": true,
        "status": "Pending",
        "message": "Assalamualaikum, ukhti",
        "taaruf_process": "TaarufRequest",
        "createdAt": "2024-10-09T01:28:20.304Z",
        "updatedAt": "2024-10-09T01:28:20.304Z"
    }
]

const sampleTaarufApproved = {
    "id": "e44f9eac-25dd-4f67-b9c2-f9cae7d3b8a2",
    "userId": "00465b08-f604-4c1d-a708-cf12940be339",
    "candidateId": "007e9bf9-5920-4002-8e58-eacc6c9666a8",
    "active": true,
    "status": "Approved",
    "message": "Assalamualaikum, ukhti",
    "taaruf_process": "TaarufApproved",
    "createdAt": "2024-10-09T01:28:20.304Z",
    "updatedAt": "2024-10-09T02:08:04.684Z"
}

const sampleTaarufRejected = {
    "id": "e44f9eac-25dd-4f67-b9c2-f9cae7d3b8a2",
    "userId": "00465b08-f604-4c1d-a708-cf12940be339",
    "candidateId": "007e9bf9-5920-4002-8e58-eacc6c9666a8",
    "active": true,
    "status": "Rejected",
    "message": "Assalamualaikum, ukhti",
    "taaruf_process": "TaarufRejected",
    "createdAt": "2024-10-09T01:28:20.304Z",
    "updatedAt": "2024-10-09T02:08:04.684Z"
}

const sampleTaarufCancelled = {
    "id": "e44f9eac-25dd-4f67-b9c2-f9cae7d3b8a2",
    "userId": "00465b08-f604-4c1d-a708-cf12940be339",
    "candidateId": "007e9bf9-5920-4002-8e58-eacc6c9666a8",
    "active": true,
    "status": "Cancelled",
    "message": "Assalamualaikum, ukhti",
    "taaruf_process": "TaarufCancelled",
    "createdAt": "2024-10-09T01:28:20.304Z",
    "updatedAt": "2024-10-09T02:08:04.684Z"
}


