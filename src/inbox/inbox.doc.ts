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
                    total_read: 0,
                    total_unread: 2,
                    total: 2,
                    page: 1,
                    maxPages: 1,
                    limit: 10,
                    data: {
                        sampleInbox
                    }
                }
            }

        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            example: {
                message: 'Unauthorized',
                statuscode: 401
            }
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            example: {
                message: 'Forbidden',
                statuscode: 403
            }
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
                example: sampleInbox2
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            example: {
                message: 'Unauthorized',
                statuscode: 401
            }
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            example: {
                message: 'Forbidden',
                statuscode: 403
            }
        }),
    );
}

export function markInboxAsReadDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Mark Inbox As Read, Member Only',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleInbox2
            }
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            example: {
                message: 'Unauthorized',
                statuscode: 401
            }
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            example: {
                message: 'Forbidden',
                statuscode: 403
            }
        }),
    );
}

export function markAsFavouriteDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Mark Inbox As Favourite, Member Only',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sampleInbox3fav
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            example: {
                message: 'Unauthorized',
                statuscode: 401
            }
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            example: {
                message: 'Forbidden',
                statuscode: 403
            }
        }),
    );
}

export function markAsUnavouriteDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Mark Inbox As Favourite, Member Only',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sampleInbox4unfav
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            example: {
                message: 'Unauthorized',
                statuscode: 403
            }
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            example: {
                message: 'Forbidden',
                statuscode: 403
            }
        }),
    );
}



const sampleInbox = [
    {
        "id": "644873a1-4c11-4004-83b5-ba016f526fec",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
        "taarufId": "10c37195-fc83-4a20-880e-71fd7ebddf07",
        "title": "Leonard telah menerima permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:18.679Z",
        "datetime": "2024-10-25T01:49:18.844Z",
        "responder": {
            "id": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "old_id": null,
            "email": "leonard.johnston215@yahoo.com",
            "firstname": "Leonard",
            "lastname": "Johnston2",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_10_lg.png",
            "avatar_md": "/dummy/ikhwan_10_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_10_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_10_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-05-20T22:14:59.006Z",
            "updatedAt": "2024-10-25T01:30:53.925Z"
        },
        "taaruf": {
            "id": "10c37195-fc83-4a20-880e-71fd7ebddf07",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufApproved",
            "createdAt": "2024-10-25T01:49:18.663Z",
            "updatedAt": "2024-10-25T01:49:18.829Z"
        }
    },
    {
        "id": "30d38ab5-2674-4817-b1d8-955c787a854f",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "9e56a9ee-a198-400e-a9e0-4419d2506468",
        "taarufId": "3e2a62f7-1b33-4e9f-9ec2-200064961fe7",
        "title": "Marianne telah menerima permintaan khitbah",
        "read": true,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:19.021Z",
        "datetime": "2024-10-25T01:49:19.878Z",
        "responder": {
            "id": "9e56a9ee-a198-400e-a9e0-4419d2506468",
            "old_id": null,
            "email": "roberto_johns4@gmail.com",
            "firstname": "Roberto",
            "lastname": "Johns4",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_1_lg.png",
            "avatar_md": "/dummy/ikhwan_1_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_1_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_1_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2023-11-26T19:29:17.904Z",
            "updatedAt": "2024-10-25T01:30:53.958Z"
        },
        "taaruf": {
            "id": "3e2a62f7-1b33-4e9f-9ec2-200064961fe7",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "9e56a9ee-a198-400e-a9e0-4419d2506468",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "KhitbahAppproved",
            "createdAt": "2024-10-25T01:49:18.999Z",
            "updatedAt": "2024-10-25T01:49:19.862Z"
        }
    },
    {
        "id": "490138d7-ba79-44a3-af46-3c29e4f65b3d",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "ebedfcb8-4f0a-4c4c-b20f-f2638a58786f",
        "taarufId": "4daaf72e-c55e-4764-a81b-b6be676ad51e",
        "title": "Dana telah menerima permintaan khitbah",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:20.037Z",
        "datetime": "2024-10-25T01:49:20.953Z",
        "responder": {
            "id": "ebedfcb8-4f0a-4c4c-b20f-f2638a58786f",
            "old_id": null,
            "email": "dana_mcclure622@gmail.com",
            "firstname": "Dana",
            "lastname": "McClure6",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_9_lg.png",
            "avatar_md": "/dummy/ikhwan_9_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_9_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_9_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-10-15T17:19:04.229Z",
            "updatedAt": "2024-10-25T01:30:53.999Z"
        },
        "taaruf": {
            "id": "4daaf72e-c55e-4764-a81b-b6be676ad51e",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "ebedfcb8-4f0a-4c4c-b20f-f2638a58786f",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "KhitbahAppproved",
            "createdAt": "2024-10-25T01:49:20.021Z",
            "updatedAt": "2024-10-25T01:49:20.929Z"
        }
    },
    {
        "id": "ade69c56-8021-414b-8b01-90cd9a187c81",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "d2c01e3a-9428-48d1-86bf-98e8e9e43fe4",
        "taarufId": "67249d68-cc85-4e54-8178-bc547627caa3",
        "title": "Hugo telah menerima permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:21.120Z",
        "datetime": "2024-10-25T01:49:21.360Z",
        "responder": {
            "id": "d2c01e3a-9428-48d1-86bf-98e8e9e43fe4",
            "old_id": null,
            "email": "hugo_kling147@gmail.com",
            "firstname": "Hugo",
            "lastname": "Kling14",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_4_lg.png",
            "avatar_md": "/dummy/ikhwan_4_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_4_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_4_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-06-06T23:31:29.099Z",
            "updatedAt": "2024-10-25T01:30:54.162Z"
        },
        "taaruf": {
            "id": "67249d68-cc85-4e54-8178-bc547627caa3",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "d2c01e3a-9428-48d1-86bf-98e8e9e43fe4",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufApproved",
            "createdAt": "2024-10-25T01:49:21.104Z",
            "updatedAt": "2024-10-25T01:49:21.271Z"
        }
    },
    {
        "id": "8c498220-589a-45fd-b4cf-fcabe35fa664",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "fc67cef9-9aeb-46a6-a77e-7eaee15868d8",
        "taarufId": "bdddbe14-2e96-4295-86a9-bb48c199c759",
        "title": "Marianne telah menolak permintaan khitbah",
        "read": true,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:21.521Z",
        "datetime": "2024-10-25T01:49:22.345Z",
        "responder": {
            "id": "fc67cef9-9aeb-46a6-a77e-7eaee15868d8",
            "old_id": null,
            "email": "fernando.bednar16@gmail.com",
            "firstname": "Fernando",
            "lastname": "Bednar16",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_9_lg.png",
            "avatar_md": "/dummy/ikhwan_9_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_9_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_9_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2023-12-12T12:34:54.830Z",
            "updatedAt": "2024-10-25T01:30:54.194Z"
        },
        "taaruf": {
            "id": "bdddbe14-2e96-4295-86a9-bb48c199c759",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "fc67cef9-9aeb-46a6-a77e-7eaee15868d8",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "KhitbahRejected",
            "createdAt": "2024-10-25T01:49:21.505Z",
            "updatedAt": "2024-10-25T01:49:22.329Z"
        }
    },
    {
        "id": "ed948721-bfb3-448b-bad2-6318edcec5ec",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "b268bc8c-d24f-4de8-9235-32042521ab22",
        "taarufId": "7bbe5c56-8cd9-4cad-a948-23e828ca8716",
        "title": "Lowell telah menolak permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:22.496Z",
        "datetime": "2024-10-25T01:49:22.687Z",
        "responder": {
            "id": "b268bc8c-d24f-4de8-9235-32042521ab22",
            "old_id": null,
            "email": "lo...",
            "firstname": "Lowell",
            "lastname": "We...",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_blurred_7_lg.png",
            "avatar_md": "/dummy/ikhwan_blurred_7_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_7_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_7_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-07-14T19:24:06.258Z",
            "updatedAt": "2024-10-25T01:30:54.259Z"
        },
        "taaruf": {
            "id": "7bbe5c56-8cd9-4cad-a948-23e828ca8716",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "b268bc8c-d24f-4de8-9235-32042521ab22",
            "active": true,
            "status": "Rejected",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufRejected",
            "createdAt": "2024-10-25T01:49:22.479Z",
            "updatedAt": "2024-10-25T01:49:22.671Z"
        }
    },
    {
        "id": "8c07e16f-7880-4902-81c0-5d4b3b64c56a",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "cde3a267-447a-4810-bda3-9efd5d3df76b",
        "taarufId": "c4cdbd09-d5f9-4fab-9067-1c79e5131e7a",
        "title": "Rickey telah menerima permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:22.854Z",
        "datetime": "2024-10-25T01:49:23.020Z",
        "responder": {
            "id": "cde3a267-447a-4810-bda3-9efd5d3df76b",
            "old_id": null,
            "email": "rickey_witting2410@gmail.com",
            "firstname": "Rickey",
            "lastname": "Witting24",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_7_lg.png",
            "avatar_md": "/dummy/ikhwan_7_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_7_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_7_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-03-09T06:10:03.692Z",
            "updatedAt": "2024-10-25T01:30:54.333Z"
        },
        "taaruf": {
            "id": "c4cdbd09-d5f9-4fab-9067-1c79e5131e7a",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "cde3a267-447a-4810-bda3-9efd5d3df76b",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufApproved",
            "createdAt": "2024-10-25T01:49:22.838Z",
            "updatedAt": "2024-10-25T01:49:23.004Z"
        }
    },
    {
        "id": "c0017472-78a0-439e-b1ce-65b3f6f12059",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "5cbf5ea7-0630-4747-817a-0008cd4f23ff",
        "taarufId": "d654cbfc-83f3-413b-81c5-0e670399772f",
        "title": "Sidney telah menolak permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:23.188Z",
        "datetime": "2024-10-25T01:49:23.353Z",
        "responder": {
            "id": "5cbf5ea7-0630-4747-817a-0008cd4f23ff",
            "old_id": null,
            "email": "si...",
            "firstname": "Sidney",
            "lastname": "Po...",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_blurred_3_lg.png",
            "avatar_md": "/dummy/ikhwan_blurred_3_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_3_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_3_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-06-26T10:25:48.044Z",
            "updatedAt": "2024-10-25T01:30:54.375Z"
        },
        "taaruf": {
            "id": "d654cbfc-83f3-413b-81c5-0e670399772f",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "5cbf5ea7-0630-4747-817a-0008cd4f23ff",
            "active": true,
            "status": "Rejected",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufRejected",
            "createdAt": "2024-10-25T01:49:23.171Z",
            "updatedAt": "2024-10-25T01:49:23.338Z"
        }
    },
    {
        "id": "03c4b13b-589a-4962-8674-91eadc6d7c64",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "c3fc2131-e2a1-47c6-8805-ad156e7f307d",
        "taarufId": "c9e7e26f-b4db-4123-a9ea-637b4d103d92",
        "title": "Ron telah menerima permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:23.538Z",
        "datetime": "2024-10-25T01:49:23.698Z",
        "responder": {
            "id": "c3fc2131-e2a1-47c6-8805-ad156e7f307d",
            "old_id": null,
            "email": "ron.west3846@gmail.com",
            "firstname": "Ron",
            "lastname": "West38",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_5_lg.png",
            "avatar_md": "/dummy/ikhwan_5_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_5_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_5_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-07-28T02:54:06.922Z",
            "updatedAt": "2024-10-25T01:30:54.578Z"
        },
        "taaruf": {
            "id": "c9e7e26f-b4db-4123-a9ea-637b4d103d92",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "c3fc2131-e2a1-47c6-8805-ad156e7f307d",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufApproved",
            "createdAt": "2024-10-25T01:49:23.504Z",
            "updatedAt": "2024-10-25T01:49:23.671Z"
        }
    },
    {
        "id": "a683abd1-7eb1-41af-9914-27ed46e3c302",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "fdf900b0-063b-4765-9ea9-5b6f39994a75",
        "taarufId": "ed3cdfd4-5ce8-4864-9ff3-9bc0846a4d9d",
        "title": "Dean telah menolak permintaan taaruf",
        "read": false,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:23.863Z",
        "datetime": "2024-10-25T01:49:24.028Z",
        "responder": {
            "id": "fdf900b0-063b-4765-9ea9-5b6f39994a75",
            "old_id": null,
            "email": "de...",
            "firstname": "Dean",
            "lastname": "Wu...",
            "active": true,
            "verified": true,
            "avatar": "/dummy/ikhwan_blurred_1_lg.png",
            "avatar_md": "/dummy/ikhwan_blurred_1_md.png",
            "blurred_avatar": "/dummy/ikhwan_blurred_1_lg.png",
            "blurred_avatar_md": "/dummy/ikhwan_blurred_1_md.png",
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-10-06T11:59:13.309Z",
            "updatedAt": "2024-10-25T01:30:54.619Z"
        },
        "taaruf": {
            "id": "ed3cdfd4-5ce8-4864-9ff3-9bc0846a4d9d",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "fdf900b0-063b-4765-9ea9-5b6f39994a75",
            "active": true,
            "status": "Rejected",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufRejected",
            "createdAt": "2024-10-25T01:49:23.845Z",
            "updatedAt": "2024-10-25T01:49:24.013Z"
        }
    }
]

const sampleInbox2 = [
    {
        "id": "644873a1-4c11-4004-83b5-ba016f526fec",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
        "taarufId": "10c37195-fc83-4a20-880e-71fd7ebddf07",
        "title": "Leonard telah menerima permintaan taaruf",
        "read": true,
        "is_favourite": true,
        "createdAt": "2024-10-25T01:49:18.679Z",
        "datetime": "2024-10-25T02:07:03.178Z",
        "messages": [
            {
                "id": "ae5069f9-2f9b-4f08-b211-7e0fb028d061",
                "inboxId": "644873a1-4c11-4004-83b5-ba016f526fec",
                "senderId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
                "receiverId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
                "taaruf_process": "TaarufRequest",
                "title": "Marianne telah mengajukan permintaan taaruf",
                "message": "Mari bertaaruf Animi tepesco cernuus. Voveo exercitationem solum surculus ventus. Exercitationem talis considero denuncio pauci arbitro error decimus somniculosus argentum.\nCursim apud eos concido calcar. Vulnero casus temperantia caelum credo perferendis conforto suffragium. Vallum spoliatio saepe auctor crapula bardus accommodo concido sursum aegrus.\nSpoliatio vorax capto contra terga cervus compello. Advenio argentum creator vulariter tamdiu tempora basium correptius. Soleo cometes considero iure correptius comminor solutio porro tamen adaugeo.\nAbutor repellat atqui vaco socius urbs sordeo. Appositus varietas placeat reprehenderit vulgivagus. Est corrupti communis constans aequus conatus arma crapula aer totus.",
                "createdAt": "2024-10-25T01:49:18.679Z"
            },
            {
                "id": "9e2897b9-a54b-459a-bbe3-1a2392170773",
                "inboxId": "644873a1-4c11-4004-83b5-ba016f526fec",
                "senderId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
                "receiverId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
                "taaruf_process": "TaarufApproved",
                "title": "Leonard telah menerima permintaan taaruf",
                "message": "Saya menyetujui permintaan taaruf, mari kita bertemu Admoveo debilito cunctatio caritas vicissitudo commodo. Cenaculum conspergo bos. Contra abduco conatus recusandae studio derideo attero aranea temperantia.\nAb urbanus animus barba assumenda cauda caries abutor tener. Defungo demulceo considero. Custodia celo alii deripio amissio ver.\nRepellendus suscipio animi cicuta tersus. Maiores decor adstringo caecus. Viridis alii accendo amplexus acquiro aurum iusto cubo qui.\nUniverse cauda arbitro viridis. Capillus cicuta deprecator tametsi exercitationem sophismata iusto tam caterva. Cedo vita veritatis ait ager substantia supellex barba admoveo.",
                "createdAt": "2024-10-25T01:49:18.845Z"
            }
        ],
        "responder": {
            "id": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "old_id": null,
            "email": "leonard.johnston215@yahoo.com",
            "firstname": "Leonard",
            "lastname": "Johnston2",
            "active": true,
            "verified": true,
            "avatar": null,
            "avatar_md": null,
            "blurred_avatar": null,
            "blurred_avatar_md": null,
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-05-20T22:14:59.006Z",
            "updatedAt": "2024-10-25T01:30:53.925Z"
        },
        "taaruf": {
            "id": "10c37195-fc83-4a20-880e-71fd7ebddf07",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufApproved",
            "createdAt": "2024-10-25T01:49:18.663Z",
            "updatedAt": "2024-10-25T01:49:18.829Z"
        }
    }
]

const sampleInbox3fav = [
    {
        "id": "644873a1-4c11-4004-83b5-ba016f526fec",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
        "taarufId": "10c37195-fc83-4a20-880e-71fd7ebddf07",
        "title": "Leonard telah menerima permintaan taaruf",
        "read": true,
        "is_favourite": true,
        "createdAt": "2024-10-25T01:49:18.679Z",
        "datetime": "2024-10-25T02:07:03.178Z",
        "messages": [
            {
                "id": "ae5069f9-2f9b-4f08-b211-7e0fb028d061",
                "inboxId": "644873a1-4c11-4004-83b5-ba016f526fec",
                "senderId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
                "receiverId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
                "taaruf_process": "TaarufRequest",
                "title": "Marianne telah mengajukan permintaan taaruf",
                "message": "Mari bertaaruf Animi tepesco cernuus. Voveo exercitationem solum surculus ventus. Exercitationem talis considero denuncio pauci arbitro error decimus somniculosus argentum.\nCursim apud eos concido calcar. Vulnero casus temperantia caelum credo perferendis conforto suffragium. Vallum spoliatio saepe auctor crapula bardus accommodo concido sursum aegrus.\nSpoliatio vorax capto contra terga cervus compello. Advenio argentum creator vulariter tamdiu tempora basium correptius. Soleo cometes considero iure correptius comminor solutio porro tamen adaugeo.\nAbutor repellat atqui vaco socius urbs sordeo. Appositus varietas placeat reprehenderit vulgivagus. Est corrupti communis constans aequus conatus arma crapula aer totus.",
                "createdAt": "2024-10-25T01:49:18.679Z"
            },
            {
                "id": "9e2897b9-a54b-459a-bbe3-1a2392170773",
                "inboxId": "644873a1-4c11-4004-83b5-ba016f526fec",
                "senderId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
                "receiverId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
                "taaruf_process": "TaarufApproved",
                "title": "Leonard telah menerima permintaan taaruf",
                "message": "Saya menyetujui permintaan taaruf, mari kita bertemu Admoveo debilito cunctatio caritas vicissitudo commodo. Cenaculum conspergo bos. Contra abduco conatus recusandae studio derideo attero aranea temperantia.\nAb urbanus animus barba assumenda cauda caries abutor tener. Defungo demulceo considero. Custodia celo alii deripio amissio ver.\nRepellendus suscipio animi cicuta tersus. Maiores decor adstringo caecus. Viridis alii accendo amplexus acquiro aurum iusto cubo qui.\nUniverse cauda arbitro viridis. Capillus cicuta deprecator tametsi exercitationem sophismata iusto tam caterva. Cedo vita veritatis ait ager substantia supellex barba admoveo.",
                "createdAt": "2024-10-25T01:49:18.845Z"
            }
        ],
        "responder": {
            "id": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "old_id": null,
            "email": "leonard.johnston215@yahoo.com",
            "firstname": "Leonard",
            "lastname": "Johnston2",
            "active": true,
            "verified": true,
            "avatar": null,
            "avatar_md": null,
            "blurred_avatar": null,
            "blurred_avatar_md": null,
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-05-20T22:14:59.006Z",
            "updatedAt": "2024-10-25T01:30:53.925Z"
        },
        "taaruf": {
            "id": "10c37195-fc83-4a20-880e-71fd7ebddf07",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufApproved",
            "createdAt": "2024-10-25T01:49:18.663Z",
            "updatedAt": "2024-10-25T01:49:18.829Z"
        }
    }
]

const sampleInbox4unfav = [
    {
        "id": "644873a1-4c11-4004-83b5-ba016f526fec",
        "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
        "responderId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
        "taarufId": "10c37195-fc83-4a20-880e-71fd7ebddf07",
        "title": "Leonard telah menerima permintaan taaruf",
        "read": true,
        "is_favourite": false,
        "createdAt": "2024-10-25T01:49:18.679Z",
        "datetime": "2024-10-25T02:07:03.178Z",
        "messages": [
            {
                "id": "ae5069f9-2f9b-4f08-b211-7e0fb028d061",
                "inboxId": "644873a1-4c11-4004-83b5-ba016f526fec",
                "senderId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
                "receiverId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
                "taaruf_process": "TaarufRequest",
                "title": "Marianne telah mengajukan permintaan taaruf",
                "message": "Mari bertaaruf Animi tepesco cernuus. Voveo exercitationem solum surculus ventus. Exercitationem talis considero denuncio pauci arbitro error decimus somniculosus argentum.\nCursim apud eos concido calcar. Vulnero casus temperantia caelum credo perferendis conforto suffragium. Vallum spoliatio saepe auctor crapula bardus accommodo concido sursum aegrus.\nSpoliatio vorax capto contra terga cervus compello. Advenio argentum creator vulariter tamdiu tempora basium correptius. Soleo cometes considero iure correptius comminor solutio porro tamen adaugeo.\nAbutor repellat atqui vaco socius urbs sordeo. Appositus varietas placeat reprehenderit vulgivagus. Est corrupti communis constans aequus conatus arma crapula aer totus.",
                "createdAt": "2024-10-25T01:49:18.679Z"
            },
            {
                "id": "9e2897b9-a54b-459a-bbe3-1a2392170773",
                "inboxId": "644873a1-4c11-4004-83b5-ba016f526fec",
                "senderId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
                "receiverId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
                "taaruf_process": "TaarufApproved",
                "title": "Leonard telah menerima permintaan taaruf",
                "message": "Saya menyetujui permintaan taaruf, mari kita bertemu Admoveo debilito cunctatio caritas vicissitudo commodo. Cenaculum conspergo bos. Contra abduco conatus recusandae studio derideo attero aranea temperantia.\nAb urbanus animus barba assumenda cauda caries abutor tener. Defungo demulceo considero. Custodia celo alii deripio amissio ver.\nRepellendus suscipio animi cicuta tersus. Maiores decor adstringo caecus. Viridis alii accendo amplexus acquiro aurum iusto cubo qui.\nUniverse cauda arbitro viridis. Capillus cicuta deprecator tametsi exercitationem sophismata iusto tam caterva. Cedo vita veritatis ait ager substantia supellex barba admoveo.",
                "createdAt": "2024-10-25T01:49:18.845Z"
            }
        ],
        "responder": {
            "id": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "old_id": null,
            "email": "leonard.johnston215@yahoo.com",
            "firstname": "Leonard",
            "lastname": "Johnston2",
            "active": true,
            "verified": true,
            "avatar": null,
            "avatar_md": null,
            "blurred_avatar": null,
            "blurred_avatar_md": null,
            "role": "MEMBER",
            "taaruf_status": "OPEN",
            "createdAt": "2024-05-20T22:14:59.006Z",
            "updatedAt": "2024-10-25T01:30:53.925Z"
        },
        "taaruf": {
            "id": "10c37195-fc83-4a20-880e-71fd7ebddf07",
            "userId": "00e27991-b50d-4e13-a486-ccd8f9abd372",
            "candidateId": "322a17f0-ac4d-4914-9c6a-d46217e26508",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "TaarufApproved",
            "createdAt": "2024-10-25T01:49:18.663Z",
            "updatedAt": "2024-10-25T01:49:18.829Z"
        }
    }
]




