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
                    total_unread: 1,
                    total:1,
                    page: 1,
                    maxPages: 1,
                    limit: 1,
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
			"id": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
			"userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
			"responderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
			"taarufId": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
			"title": "Karla telah menerima permintaan nadhar",
			"read": false,
			"is_favourite": false,
			"createdAt": "2024-10-30T02:09:11.604Z",
			"datetime": "2024-10-30T02:09:12.213Z",
			"responder": {
				"id": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
				"old_id": null,
				"email": "karla.howell46@hotmail.com",
				"firstname": "Karla",
				"lastname": "Crist43",
				"active": true,
				"verified": true,
				"avatar": "/dummy/akhwat_5_lg.jpg",
				"avatar_md": "/dummy/akhwat_5_md.jpg",
				"blurred_avatar": "/dummy/akhwat_blurred_5_lg.jpg",
				"blurred_avatar_md": "/dummy/akhwat_blurred_5_md.jpg",
				"role": "MEMBER",
				"taaruf_status": "ACTIVE",
				"createdAt": "2023-12-01T09:10:23.736Z",
				"updatedAt": "2024-10-30T02:09:11.939Z"
			},
			"taaruf": {
				"id": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
				"userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
				"candidateId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
				"active": true,
				"status": "Approved",
				"message": "Mari bertaaruf",
				"taaruf_process": "NadharApproved",
				"createdAt": "2024-10-30T02:09:11.573Z",
				"updatedAt": "2024-10-30T02:09:12.189Z"
			}
		}
]

const sampleInbox2 = [
    {
        "id": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
        "userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
        "responderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
        "taarufId": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
        "title": "Karla telah menerima permintaan nadhar",
        "read": true,
        "is_favourite": false,
        "createdAt": "2024-10-30T02:09:11.604Z",
        "datetime": "2024-10-30T02:09:12.213Z",
        "messages": [
            {
                "id": "760ee44a-5f96-47cb-9e7a-809f34c87536",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "receiverId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "taaruf_process": "TaarufRequest",
                "title": "Cesar telah mengajukan permintaan taaruf",
                "message": "Mari bertaaruf Denuncio vitiosus artificiose comburo pax vitiosus appositus unde. Aranea tandem sollers agnosco tristis. Denuncio basium dens patruus via iusto sufficio ut.\nVenia astrum acies soluta defungo alo arto tredecim calculus. Sponte porro quisquam cunabula amet aperte. Comparo terreo vos bene cattus aspernatur artificiose.\nQuas sopor suggero. Speculum vomito copiose alioqui rerum. Pectus adsum beatus curvo stipes careo labore quam absens.\nAdministratio sublime tener comburo. Coaegresco campana cur. Sequi libero desidero textilis.",
                "createdAt": "2024-10-30T02:09:11.604Z"
            },
            {
                "id": "de035d55-d428-413e-81c6-5c5597f7fba0",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "receiverId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "taaruf_process": "TaarufApproved",
                "title": "Karla telah menerima permintaan taaruf",
                "message": "Saya menyetujui permintaan taaruf, mari kita bertemu Ambitus tribuo supellex conventus acies. Tersus caries crux antea. Fugiat creo velit aveho alienus.\nAspicio pariatur peior. Deputo arca aegrus. Caries comis derideo tristis bibo amplus doloremque avaritia.\nTempus baiulus varietas charisma cinis voco acidus. Depromo inflammatio rem cribro incidunt talio. Vilis cuppedia claro desino asper umerus.\nBrevis ulciscor quaerat. Crapula defaeco debilito placeat. Vitae porro adeptio vulticulus.",
                "createdAt": "2024-10-30T02:09:11.784Z"
            },
            {
                "id": "b0a722a1-a38f-472d-a5f8-8d0c78d246ff",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "receiverId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "taaruf_process": "NadharRequest",
                "title": "Cesar telah mengajukan permintaan nadhar",
                "message": "Mari bertemu untuk nadhar Tredecim vomito caries iure. Depraedor acidus subito tabesco terga adnuo delibero valeo barba. Concido congregatio aperio conduco alveus astrum bellum.\nAnser denuo currus vado voro tego contabesco odit. Angustus cavus dignissimos. Spes vicinus neque arbustum ultra deficio via angelus vapulus.\nStatim claustrum vitiosus. Ambulo dolorum canonicus currus accusantium voro aufero. Conservo casus teres avaritia amita sol utilis fugiat.\nCauda suscipio cariosus eius. Uterque sordeo eaque iste tabella vinculum denego solvo. Temptatio abundans conturbo vivo conqueror torqueo votum rem titulus umerus.",
                "createdAt": "2024-10-30T02:09:12.010Z"
            },
            {
                "id": "42b77430-b9bc-4eb8-a4d4-b3c14dca3404",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "receiverId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "taaruf_process": "NadharApproved",
                "title": "Karla telah menerima permintaan nadhar",
                "message": "Saya menyetujui permintaan nadhar, mari kita bertemu Nostrum taceo termes conservo agnosco natus delectus succurro laboriosam. Sodalitas deleniti decerno utique ulciscor vulnus admitto adeo vacuus. Cognatus tristis quisquam adicio aufero tumultus sumo.\nCaelestis vos verto collum tunc acsi utor sopor. Sto tum deporto conservo alienus thorax avaritia. Coaegresco vitiosus cunae capio amoveo aegre.\nCoerceo curis vicinus admitto. Cursus sit venustas amo stipes nostrum dignissimos careo a attero. Benigne calcar despecto certe corrigo utpote varius repellat defetiscor.\nTertius sublime cohors clamo vilitas abbas copia tamdiu suadeo turpis. Non sed accommodo. Reiciendis tubineus advenio ventus.",
                "createdAt": "2024-10-30T02:09:12.214Z"
            }
        ],
        "responder": {
            "id": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
            "old_id": null,
            "email": "karla.howell46@hotmail.com",
            "firstname": "Karla",
            "lastname": "Crist43",
            "active": true,
            "verified": true,
            "avatar": null,
            "avatar_md": null,
            "blurred_avatar": null,
            "blurred_avatar_md": null,
            "role": "MEMBER",
            "taaruf_status": "ACTIVE",
            "createdAt": "2023-12-01T09:10:23.736Z",
            "updatedAt": "2024-10-30T02:09:11.939Z"
        },
        "taaruf": {
            "id": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
            "userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
            "candidateId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "NadharApproved",
            "createdAt": "2024-10-30T02:09:11.573Z",
            "updatedAt": "2024-10-30T02:09:12.189Z"
        }
    }
]


const sampleInbox3fav = [
    {
        "id": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
        "userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
        "responderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
        "taarufId": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
        "title": "Karla telah menerima permintaan nadhar",
        "read": true,
        "is_favourite": true,
        "createdAt": "2024-10-30T02:09:11.604Z",
        "datetime": "2024-10-30T02:09:12.213Z",
        "messages": [
            {
                "id": "760ee44a-5f96-47cb-9e7a-809f34c87536",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "receiverId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "taaruf_process": "TaarufRequest",
                "title": "Cesar telah mengajukan permintaan taaruf",
                "message": "Mari bertaaruf Denuncio vitiosus artificiose comburo pax vitiosus appositus unde. Aranea tandem sollers agnosco tristis. Denuncio basium dens patruus via iusto sufficio ut.\nVenia astrum acies soluta defungo alo arto tredecim calculus. Sponte porro quisquam cunabula amet aperte. Comparo terreo vos bene cattus aspernatur artificiose.\nQuas sopor suggero. Speculum vomito copiose alioqui rerum. Pectus adsum beatus curvo stipes careo labore quam absens.\nAdministratio sublime tener comburo. Coaegresco campana cur. Sequi libero desidero textilis.",
                "createdAt": "2024-10-30T02:09:11.604Z"
            },
            {
                "id": "de035d55-d428-413e-81c6-5c5597f7fba0",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "receiverId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "taaruf_process": "TaarufApproved",
                "title": "Karla telah menerima permintaan taaruf",
                "message": "Saya menyetujui permintaan taaruf, mari kita bertemu Ambitus tribuo supellex conventus acies. Tersus caries crux antea. Fugiat creo velit aveho alienus.\nAspicio pariatur peior. Deputo arca aegrus. Caries comis derideo tristis bibo amplus doloremque avaritia.\nTempus baiulus varietas charisma cinis voco acidus. Depromo inflammatio rem cribro incidunt talio. Vilis cuppedia claro desino asper umerus.\nBrevis ulciscor quaerat. Crapula defaeco debilito placeat. Vitae porro adeptio vulticulus.",
                "createdAt": "2024-10-30T02:09:11.784Z"
            },
            {
                "id": "b0a722a1-a38f-472d-a5f8-8d0c78d246ff",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "receiverId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "taaruf_process": "NadharRequest",
                "title": "Cesar telah mengajukan permintaan nadhar",
                "message": "Mari bertemu untuk nadhar Tredecim vomito caries iure. Depraedor acidus subito tabesco terga adnuo delibero valeo barba. Concido congregatio aperio conduco alveus astrum bellum.\nAnser denuo currus vado voro tego contabesco odit. Angustus cavus dignissimos. Spes vicinus neque arbustum ultra deficio via angelus vapulus.\nStatim claustrum vitiosus. Ambulo dolorum canonicus currus accusantium voro aufero. Conservo casus teres avaritia amita sol utilis fugiat.\nCauda suscipio cariosus eius. Uterque sordeo eaque iste tabella vinculum denego solvo. Temptatio abundans conturbo vivo conqueror torqueo votum rem titulus umerus.",
                "createdAt": "2024-10-30T02:09:12.010Z"
            },
            {
                "id": "42b77430-b9bc-4eb8-a4d4-b3c14dca3404",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "receiverId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "taaruf_process": "NadharApproved",
                "title": "Karla telah menerima permintaan nadhar",
                "message": "Saya menyetujui permintaan nadhar, mari kita bertemu Nostrum taceo termes conservo agnosco natus delectus succurro laboriosam. Sodalitas deleniti decerno utique ulciscor vulnus admitto adeo vacuus. Cognatus tristis quisquam adicio aufero tumultus sumo.\nCaelestis vos verto collum tunc acsi utor sopor. Sto tum deporto conservo alienus thorax avaritia. Coaegresco vitiosus cunae capio amoveo aegre.\nCoerceo curis vicinus admitto. Cursus sit venustas amo stipes nostrum dignissimos careo a attero. Benigne calcar despecto certe corrigo utpote varius repellat defetiscor.\nTertius sublime cohors clamo vilitas abbas copia tamdiu suadeo turpis. Non sed accommodo. Reiciendis tubineus advenio ventus.",
                "createdAt": "2024-10-30T02:09:12.214Z"
            }
        ],
        "responder": {
            "id": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
            "old_id": null,
            "email": "karla.howell46@hotmail.com",
            "firstname": "Karla",
            "lastname": "Crist43",
            "active": true,
            "verified": true,
            "avatar": null,
            "avatar_md": null,
            "blurred_avatar": null,
            "blurred_avatar_md": null,
            "role": "MEMBER",
            "taaruf_status": "ACTIVE",
            "createdAt": "2023-12-01T09:10:23.736Z",
            "updatedAt": "2024-10-30T02:09:11.939Z"
        },
        "taaruf": {
            "id": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
            "userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
            "candidateId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "NadharApproved",
            "createdAt": "2024-10-30T02:09:11.573Z",
            "updatedAt": "2024-10-30T02:09:12.189Z"
        }
    }
]

const sampleInbox4unfav = [
    {
        "id": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
        "userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
        "responderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
        "taarufId": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
        "title": "Karla telah menerima permintaan nadhar",
        "read": true,
        "is_favourite": false,
        "createdAt": "2024-10-30T02:09:11.604Z",
        "datetime": "2024-10-30T02:09:12.213Z",
        "messages": [
            {
                "id": "760ee44a-5f96-47cb-9e7a-809f34c87536",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "receiverId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "taaruf_process": "TaarufRequest",
                "title": "Cesar telah mengajukan permintaan taaruf",
                "message": "Mari bertaaruf Denuncio vitiosus artificiose comburo pax vitiosus appositus unde. Aranea tandem sollers agnosco tristis. Denuncio basium dens patruus via iusto sufficio ut.\nVenia astrum acies soluta defungo alo arto tredecim calculus. Sponte porro quisquam cunabula amet aperte. Comparo terreo vos bene cattus aspernatur artificiose.\nQuas sopor suggero. Speculum vomito copiose alioqui rerum. Pectus adsum beatus curvo stipes careo labore quam absens.\nAdministratio sublime tener comburo. Coaegresco campana cur. Sequi libero desidero textilis.",
                "createdAt": "2024-10-30T02:09:11.604Z"
            },
            {
                "id": "de035d55-d428-413e-81c6-5c5597f7fba0",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "receiverId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "taaruf_process": "TaarufApproved",
                "title": "Karla telah menerima permintaan taaruf",
                "message": "Saya menyetujui permintaan taaruf, mari kita bertemu Ambitus tribuo supellex conventus acies. Tersus caries crux antea. Fugiat creo velit aveho alienus.\nAspicio pariatur peior. Deputo arca aegrus. Caries comis derideo tristis bibo amplus doloremque avaritia.\nTempus baiulus varietas charisma cinis voco acidus. Depromo inflammatio rem cribro incidunt talio. Vilis cuppedia claro desino asper umerus.\nBrevis ulciscor quaerat. Crapula defaeco debilito placeat. Vitae porro adeptio vulticulus.",
                "createdAt": "2024-10-30T02:09:11.784Z"
            },
            {
                "id": "b0a722a1-a38f-472d-a5f8-8d0c78d246ff",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "receiverId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "taaruf_process": "NadharRequest",
                "title": "Cesar telah mengajukan permintaan nadhar",
                "message": "Mari bertemu untuk nadhar Tredecim vomito caries iure. Depraedor acidus subito tabesco terga adnuo delibero valeo barba. Concido congregatio aperio conduco alveus astrum bellum.\nAnser denuo currus vado voro tego contabesco odit. Angustus cavus dignissimos. Spes vicinus neque arbustum ultra deficio via angelus vapulus.\nStatim claustrum vitiosus. Ambulo dolorum canonicus currus accusantium voro aufero. Conservo casus teres avaritia amita sol utilis fugiat.\nCauda suscipio cariosus eius. Uterque sordeo eaque iste tabella vinculum denego solvo. Temptatio abundans conturbo vivo conqueror torqueo votum rem titulus umerus.",
                "createdAt": "2024-10-30T02:09:12.010Z"
            },
            {
                "id": "42b77430-b9bc-4eb8-a4d4-b3c14dca3404",
                "inboxId": "abb7f0f1-3130-4f2e-b9c8-7c3aa3facc1f",
                "senderId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
                "receiverId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
                "taaruf_process": "NadharApproved",
                "title": "Karla telah menerima permintaan nadhar",
                "message": "Saya menyetujui permintaan nadhar, mari kita bertemu Nostrum taceo termes conservo agnosco natus delectus succurro laboriosam. Sodalitas deleniti decerno utique ulciscor vulnus admitto adeo vacuus. Cognatus tristis quisquam adicio aufero tumultus sumo.\nCaelestis vos verto collum tunc acsi utor sopor. Sto tum deporto conservo alienus thorax avaritia. Coaegresco vitiosus cunae capio amoveo aegre.\nCoerceo curis vicinus admitto. Cursus sit venustas amo stipes nostrum dignissimos careo a attero. Benigne calcar despecto certe corrigo utpote varius repellat defetiscor.\nTertius sublime cohors clamo vilitas abbas copia tamdiu suadeo turpis. Non sed accommodo. Reiciendis tubineus advenio ventus.",
                "createdAt": "2024-10-30T02:09:12.214Z"
            }
        ],
        "responder": {
            "id": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
            "old_id": null,
            "email": "karla.howell46@hotmail.com",
            "firstname": "Karla",
            "lastname": "Crist43",
            "active": true,
            "verified": true,
            "avatar": null,
            "avatar_md": null,
            "blurred_avatar": null,
            "blurred_avatar_md": null,
            "role": "MEMBER",
            "taaruf_status": "ACTIVE",
            "createdAt": "2023-12-01T09:10:23.736Z",
            "updatedAt": "2024-10-30T02:09:11.939Z"
        },
        "taaruf": {
            "id": "ca055ea0-f4a2-4dbd-8936-dda6ad921fd3",
            "userId": "02a21ddc-bdb6-4ff0-90ca-bd8d15d8d15b",
            "candidateId": "84d27eaa-cb42-4c56-a73a-48602faf95bb",
            "active": true,
            "status": "Approved",
            "message": "Mari bertaaruf",
            "taaruf_process": "NadharApproved",
            "createdAt": "2024-10-30T02:09:11.573Z",
            "updatedAt": "2024-10-30T02:09:12.189Z"
        }
    }
]




