import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateClientDto } from './dto/update-client.dto';

export function GetClientDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Client Data. Public' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sampleClient,
        }),
    );
}

export function EditClientDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Edit Client Data. Restricted for Superadmin & Admin',
        }),
        ApiBody({
            type: UpdateClientDto, // TODO masih kosong Dtonya
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            example: sampleClient,
        }),
    );
}

const sampleClient = {
    id: '94de0914-cf51-47a4-8234-812824d9848a',
    name: 'Lorem Ipsum',
    about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptates dolores eum tenetur impedit dicta suscipit modi aliquid est similique adipisci optio officiis iusto nobis non, nemo sunt, nam quia quasi vel ut facere beatae! Quaerat necessitatibus unde neque, quas libero odit nemo rerum eveniet veritatis et! Nesciunt, illo tempora. Consequuntur fugit maxime error eaque natus porro cupiditate optio consequatur itaque nemo dolorem voluptas, dignissimos vel. Voluptates, quia asperiores, numquam quam dolorum fugit nulla ut rerum a omnis cupiditate distinctio deleniti quis voluptas illum? Dolor quisquam sunt ipsa, sed maiores eum excepturi omnis laborum, ullam deleniti nihil itaque ab dolorum.',
    phone: '+62 888-8888-8888',
    address: 'Jl Harapan Indah Jakarta Indonesia.',
    taaruf_muqoddimah: 'Taaruf Muqoddimah',
    login_muqoddimah: 'Login Muqoddimah',
    signup_muqoddimah: 'Signup Muqoddimah',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    tiktok: 'https://tiktok.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
};
