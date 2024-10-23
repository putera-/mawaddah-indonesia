import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetAllInboxDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Inbox, Member Only',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    limit: 2,
                    total: 100,
                    page: 1,
                    maxPages: 12,
                    data: {
                        sampleInbox
                    }
                }
            }

        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
        }),
    );
}


export function GetInboxByIdDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Inbox By Id, Member Only',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleInbox
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
        }),
    );
}



const sampleInbox = [
    {
        "id": "8b4a9cbd-ffb7-48a4-bbc6-903fd918675a",
        "userId": "00465b08-f604-4c1d-a708-cf12940be339",
        "taarufId": "57f59761-7e1e-480d-9e23-9fa926479312",
        "title": "Wade telah menolak permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-08T01:38:31.312Z",
        "datetime": "2024-10-08T01:38:31.362Z",
        "user": {
            "id": "00465b08-f604-4c1d-a708-cf12940be339",
            "old_id": null,
            "email": "mi...",
            "firstname": "Michelle",
            "lastname": "Fe...",
            "active": true,
            "verified": true,
            "blurred_avatar": "/dummy/akhwat_blurred_2_lg.jpg",
            "blurred_avatar_md": "/dummy/akhwat_blurred_2_md.jpg",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-02-15T16:19:39.590Z",
            "updatedAt": "2024-10-08T01:32:37.706Z"
        }
    },
    {
        "id": "e7b0dca3-f773-41cb-83fb-f184f1c88c94",
        "userId": "00465b08-f604-4c1d-a708-cf12940be339",
        "taarufId": "e44f9eac-25dd-4f67-b9c2-f9cae7d3b8a2",
        "title": "Karl telah menerima permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-09T01:28:20.388Z",
        "datetime": "2024-10-09T02:08:04.768Z",
        "user": {
            "id": "00465b08-f604-4c1d-a708-cf12940be339",
            "old_id": null,
            "email": "mi...",
            "firstname": "Michelle",
            "lastname": "Fe...",
            "active": true,
            "verified": true,
            "blurred_avatar": "/dummy/akhwat_blurred_2_lg.jpg",
            "blurred_avatar_md": "/dummy/akhwat_blurred_2_md.jpg",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-02-15T16:19:39.590Z",
            "updatedAt": "2024-10-08T01:32:37.706Z"
        }
    }
]

const sampleInbox2 = {
    "id": "e7b0dca3-f773-41cb-83fb-f184f1c88c94",
    "userId": "00465b08-f604-4c1d-a708-cf12940be339",
    "taarufId": "e44f9eac-25dd-4f67-b9c2-f9cae7d3b8a2",
    "title": "Karl telah menerima permintaan taaruf",
    "read": false,
    "is_favourite": false,
    "createdAt": "2024-10-09T01:28:20.388Z",
    "datetime": "2024-10-09T02:08:04.768Z",
    "user": {
        "id": "00465b08-f604-4c1d-a708-cf12940be339",
        "old_id": null,
        "email": "mi...",
        "firstname": "Michelle",
        "lastname": "Fe...",
        "active": true,
        "verified": true,
        "blurred_avatar": "/dummy/akhwat_blurred_2_lg.jpg",
        "blurred_avatar_md": "/dummy/akhwat_blurred_2_md.jpg",
        "role": "MEMBER",
        "taaruf_status": "OPEN",
        "createdAt": "2024-02-15T16:19:39.590Z",
        "updatedAt": "2024-10-08T01:32:37.706Z"
    }
}
