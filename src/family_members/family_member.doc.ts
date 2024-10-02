import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateFamilyMemberDto } from './dto/create-family_member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family_member.dto';

export function CreateFamilyMemberDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create , Restricted Member Only' }),
        ApiBody({
            type: CreateFamilyMemberDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: sampleFamilyMember,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Silakan lengkapi biodata terlebih dahulu.',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function GetAllFamilyMemberDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get All Family Members, Restricted Member Only',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleFamilyMembers,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Data tidak ditemukan',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function GetFamilyMemberByIdDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Family Member By Id, Restricted Member Only',
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleFamilyMember,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Data tidak ditemukan',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function UpdateFamilyMemberDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Family Member By Id, Restricted Member Only',
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
        }),
        ApiBody({
            type: UpdateFamilyMemberDto,
        }),
        ApiResponse({
            status: 204,
            description: 'Success',
            schema: {
                example: sampleFamilyMember,
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Data tidak ditemukan',
                    statusCode: 404,
                },
            },
        }),
    );
}

export function DeleteFamilyMemberDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete Family Member By Id, Restricted Member Only',
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
        }),
        ApiResponse({
            status: 204,
        }),
        ApiResponse({
            status: 404,
            description: 'Error: Not Found',
            schema: {
                example: {
                    message: 'Data tidak ditemukan',
                    statusCode: 404,
                },
            },
        }),
    );
}

const sampleFamilyMember = {
    id: '62c5fc4d-1e46-482b-8669-6c3e2b648b29',
    biodataId: '5f14402c-6fa2-4284-8e2c-82b935bad087',
    relationship: 'adik_wanita',
    religion: 'islam',
    dob: '1997-05-29',
    education: 'S1 Teknik Informatika di STIMK Jakarta',
    job: 'wood logging',
    is_alive: true,
    deleted: false,
    createdAt: '2024-09-27T02:08:23.202Z',
    updatedAt: '2024-09-27T02:08:23.202Z',
};

const sampleFamilyMembers = [
    {
        id: '1349aa6a-df86-4323-be4a-1afb95d34b74',
        biodataId: '5f14402c-6fa2-4284-8e2c-82b935bad087',
        relationship: 'anak_kandung',
        religion: 'islam',
        dob: '1999-03-26',
        education: 'D1',
        job: 'Wiraswasta',
        is_alive: false,
        deleted: false,
        createdAt: '2024-09-10T01:58:55.243Z',
        updatedAt: '2024-09-10T01:58:55.243Z',
    },
    {
        id: '62c5fc4d-1e46-482b-8669-6c3e2b648b29',
        biodataId: '5f14402c-6fa2-4284-8e2c-82b935bad087',
        relationship: 'adik_wanita',
        religion: 'islam',
        dob: '1997-05-29',
        education: 'S1 Teknik Informatika di STIMK Jakarta',
        job: 'wood logging',
        is_alive: true,
        deleted: false,
        createdAt: '2024-09-27T02:08:23.202Z',
        updatedAt: '2024-09-27T02:08:23.202Z',
    },
];
