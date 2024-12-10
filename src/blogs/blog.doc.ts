import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

export function PostBlogDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Blog, Restricted for Admin & SuperAdmin',
        }),
        ApiBody({
            type: CreateBlogDto,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleBlog,
            },
        }),
    );
}

export function UpdateBlogDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Blog, Restricted for Admin & SuperAdmin',
        }),
        ApiParam({
            name: 'id',
            type: String,
        }),
        ApiBody({
            type: UpdateBlogDto,
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleBlog,
            },
        }),
    );
}

const sampleBlogs = {
    data: [
        {
            id: '28c96a29-5ab0-40c8-ab8c-3f6245cf54d0',
            title: 'Adsum adeptio aegrus.',
            content: 'Volutabrum placeat quod angulus terebro.',
            image: '/dummy/blog2.png',
            image_md: '/dummy/blog2_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.811Z',
            updatedAt: '2024-12-10T02:24:02.811Z',
        },
        {
            id: '8b27909b-acb1-4076-b561-d6a8cf4bc742',
            title: 'Campana subnecto iste corrumpo defleo succedo corrumpo debilito.',
            content:
                'Voluptatem adnuo delectatio delicate viridis ullus vergo audentia textor ullus.',
            image: '/dummy/blog1.png',
            image_md: '/dummy/blog1_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.811Z',
            updatedAt: '2024-12-10T02:24:02.811Z',
        },
        {
            id: 'f0a23bd0-9998-4f8e-9618-802c1fb65d60',
            title: 'Tener debeo veritas approbo.',
            content: 'Conor capitulus apostolus.',
            image: '/dummy/blog1.png',
            image_md: '/dummy/blog1_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.811Z',
            updatedAt: '2024-12-10T02:24:02.811Z',
        },
        {
            id: '0b371ab8-f4d8-4ca8-95e7-24730447e8d0',
            title: 'Denego vulgivagus charisma creptio clamo ad calculus viduo.',
            content: 'Clarus thema undique.',
            image: '/dummy/blog1.png',
            image_md: '/dummy/blog1_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.810Z',
            updatedAt: '2024-12-10T02:24:02.810Z',
        },
        {
            id: '85b8db66-82c8-47cc-8eb4-cd1ed765ce98',
            title: 'Stips cupio vulticulus atqui depromo atqui alter.',
            content: 'Comitatus ipsa inflammatio omnis despecto.',
            image: '/dummy/blog1.png',
            image_md: '/dummy/blog1_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.810Z',
            updatedAt: '2024-12-10T02:24:02.810Z',
        },
        {
            id: 'a1c74e40-10c1-4731-9447-232c3747cc50',
            title: 'Cursim ara asperiores vehemens careo aliquid considero corpus supra.',
            content: 'Peccatus cinis commodi mollitia.',
            image: '/dummy/blog2.png',
            image_md: '/dummy/blog2_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.810Z',
            updatedAt: '2024-12-10T02:24:02.810Z',
        },
        {
            id: '6ae0716e-dd5e-457c-b4b1-2e1f7c9aa5f4',
            title: 'Suscipio suppono audacia suppellex ad decretum decimus.',
            content:
                'Coniecto cernuus cinis iure turpis ver una adstringo curtus aedificium.',
            image: '/dummy/blog2.png',
            image_md: '/dummy/blog2_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.810Z',
            updatedAt: '2024-12-10T02:24:02.810Z',
        },
        {
            id: 'd2d39b5f-3055-456c-94b6-c05a8c0ac504',
            title: 'Subseco cervus tribuo laborum vicinus absconditus aeneus admitto.',
            content: 'Adduco vorax beatus stultus tredecim.',
            image: '/dummy/blog2.png',
            image_md: '/dummy/blog2_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.810Z',
            updatedAt: '2024-12-10T02:24:02.810Z',
        },
        {
            id: '0a9208c2-0c28-4a5a-86c6-faf4a6b9b1fe',
            title: 'Curo atque beneficium suscipio cerno.',
            content: 'Terebro adfectus temptatio textilis.',
            image: '/dummy/blog1.png',
            image_md: '/dummy/blog1_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.810Z',
            updatedAt: '2024-12-10T02:24:02.810Z',
        },
        {
            id: 'c2a9c6c4-8b5e-4e5d-8215-bdb7512a2fc2',
            title: 'Terror vorago terminatio.',
            content: 'Consuasor id volo.',
            image: '/dummy/blog1.png',
            image_md: '/dummy/blog1_md.png',
            active: true,
            deleted: false,
            createdAt: '2024-12-10T02:24:02.810Z',
            updatedAt: '2024-12-10T02:24:02.810Z',
        },
    ],
    total: 20,
    page: 1,
    maxPages: 2,
    limit: 10,
};

const sampleBlog = {
    id: '28c96a29-5ab0-40c8-ab8c-3f6245cf54d0',
    title: 'Adsum adeptio aegrus.',
    content: 'Volutabrum placeat quod angulus terebro.',
    image: '/dummy/blog2.png',
    image_md: '/dummy/blog2_md.png',
    active: true,
    deleted: false,
    createdAt: '2024-12-10T02:24:02.811Z',
    updatedAt: '2024-12-10T02:24:02.811Z',
};
