import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetLandingPageDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Landing Page, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleLandingPage,
            },
        }),
    );
}

export function CreateMainSlideDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Main Slide, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleMainSlide,
            },
        }),
    );
}
export function UpdateMainSlideDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Main Slide, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleMainSlide,
            },
        }),
    );
}
export function CreateProcessStepDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Process Step, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleProcessStep,
            },
        }),
    );
}
export function UpdateProcessStepDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Process Step, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleProcessStep,
            },
        }),
    );
}

export function UpdateAboutDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update About, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleAbout,
            },
        }),
    );
}

export function CreateSocialMediaDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create Social Media, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleSocialMedia,
            },
        }),
    );
}
export function UpdateSocialMediaDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update Social Media, Restricted for Admin & SuperAdmin',
        }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: sampleSocialMedia,
            },
        }),
    );
}

const sampleLandingPage = {
    main_slide: [
        {
            id: '6e79d2e3-92ad-4c12-8fa0-8b92163904da',
            text: 'Terebro annus ter teneo sub cinis arcesso quis vado.',
            image: 'https://picsum.photos/seed/eRZaz6YhQu/640/480',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '530da12a-011d-498c-a53f-f9095abbbb80',
            text: 'Socius tonsor aeternus acies timor.',
            image: 'https://picsum.photos/seed/rtATBB/640/480',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '05692766-204a-4dbb-b248-09b95a98fa01',
            text: 'Complectus decor audax.',
            image: 'https://picsum.photos/seed/D5MNRUWPwx/640/480',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
    ],
    process_step: [
        {
            id: 'abdf6922-7fc9-4ccf-aa7e-6f525fb5f66a',
            title: 'Nisi via delectatio terra.',
            description:
                'Bestia ancilla facilis conitor cresco laudantium audacia reiciendis tunc quo.',
            svg: '<svg width="109" height="103" viewBox="0 0 109 103" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M83.109 96.1544C91.9418 94.1306 108.771 83.9463 109.001 53.3319C109.001 32.4807 91.9174 25.5131 78.595 26.5934C67.3009 27.5092 50.2129 37.4041 52.8193 60.5721C55.1817 81.571 68.7263 93.7671 79.6513 95.8668C79.0438 96.5979 78.3485 97.5316 77.8742 98.4652C77.5656 99.0726 77.3505 99.7414 77.2006 100.379C76.9058 101.631 78.2057 102.479 79.3604 101.911L80.93 101.138L83.6531 102.084C84.9604 102.538 86.1855 101.37 85.6414 100.098C85.3685 99.4597 85.043 98.7824 84.6648 98.1311C84.2165 97.3589 83.6572 96.696 83.109 96.1544Z" fill="url(#paint0_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M80.621 76.9661C75.2893 74.5817 66.081 67.1182 68.5935 59.9395C70.9048 53.3357 78.0271 54.0384 80.6889 57.5318C83.3506 54.0384 90.4729 53.3357 92.7842 59.9395C95.2967 67.1182 86.0885 74.5817 80.7567 76.9661V77.026C80.7342 77.0162 80.7115 77.0063 80.6889 76.9962C80.6662 77.0063 80.6435 77.0162 80.621 77.026V76.9661Z" fill="url(#paint1_linear_1767_4154)"/><circle cx="86.0248" cy="59.7474" r="1.06187" fill="#DF9A77"/><circle cx="88.3418" cy="61.0996" r="0.675734" fill="#DF9A77"/><circle cx="88.4369" cy="58.8783" r="0.386133" fill="#DF9A77"/><circle cx="91.7787" cy="47.3353" r="3.3373" fill="#FFE0C8"/><circle cx="99.0612" cy="51.5827" r="2.12373" fill="#FFE0C8"/><circle cx="99.36" cy="44.6042" r="1.21356" fill="#FFE0C8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M40.7937 93.8369C52.5859 91.1354 75.0542 77.539 75.3615 36.6664C75.3615 8.82892 52.5539 -0.47309 34.7679 0.969084C19.6896 2.1917 -3.12375 15.402 0.355936 46.3326C3.50975 74.3665 21.5916 90.6488 36.1768 93.4526C35.3658 94.4287 34.4377 95.6751 33.8045 96.9215C33.3925 97.7324 33.1053 98.6252 32.9052 99.4758C32.5116 101.148 34.2471 102.28 35.7886 101.522L37.8841 100.49L41.5196 101.753C43.265 102.359 44.9005 100.8 44.1741 99.1012C43.8098 98.2492 43.3752 97.345 42.8703 96.4754C42.2719 95.4448 41.5254 94.56 40.7937 93.8369Z" fill="url(#paint2_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M37.4731 68.2193C30.355 65.036 18.0614 55.0719 21.4158 45.4879C24.5015 36.6715 34.0101 37.6096 37.5637 42.2734C41.1173 37.6096 50.6259 36.6715 53.7116 45.4879C57.066 55.0719 44.7725 65.036 37.6543 68.2193V68.2993C37.6242 68.2862 37.594 68.2729 37.5637 68.2595C37.5334 68.2729 37.5032 68.2862 37.4731 68.2993V68.2193Z" fill="url(#paint3_linear_1767_4154)"/><circle cx="44.6891" cy="45.2302" r="1.41765" fill="#FEC1A2"/><circle cx="47.783" cy="47.035" r="0.902141" fill="#FEC1A2"/><circle cx="47.91" cy="44.0702" r="0.515509" fill="#FEC1A2"/><circle cx="52.3656" cy="28.6606" r="4.45547" fill="#FFE0C8"/><circle cx="62.0912" cy="34.3314" r="2.8353" fill="#FFE0C8"/><circle cx="62.4893" cy="25.0147" r="1.62017" fill="#FFE0C8"/><defs><linearGradient id="paint0_linear_1767_4154" x1="80.7769" y1="26.4863" x2="80.7769" y2="102.184" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#C93636"/></linearGradient><linearGradient id="paint1_linear_1767_4154" x1="80.6889" y1="54.9219" x2="73.4298" y2="76.7496" gradientUnits="userSpaceOnUse"><stop stop-color="#FAD5AE"/><stop offset="1" stop-color="#EF8C77"/></linearGradient><linearGradient id="paint2_linear_1767_4154" x1="71.8862" y1="6.16487" x2="19.6082" y2="96.3911" gradientUnits="userSpaceOnUse"><stop stop-color="#FED4A7"/><stop offset="1" stop-color="#F89B89"/></linearGradient><linearGradient id="paint3_linear_1767_4154" x1="37.5637" y1="38.7891" x2="37.5637" y2="68.2993" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#6A4343"/></linearGradient></defs></svg>',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '4f0dbdb6-f9df-46fd-a3b5-218c678ca991',
            title: 'Compello arbitro vehemens crinis deprimo labore clamo tabula.',
            description: 'Communis odit caelestis via.',
            svg: '<svg width="109" height="103" viewBox="0 0 109 103" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M83.109 96.1544C91.9418 94.1306 108.771 83.9463 109.001 53.3319C109.001 32.4807 91.9174 25.5131 78.595 26.5934C67.3009 27.5092 50.2129 37.4041 52.8193 60.5721C55.1817 81.571 68.7263 93.7671 79.6513 95.8668C79.0438 96.5979 78.3485 97.5316 77.8742 98.4652C77.5656 99.0726 77.3505 99.7414 77.2006 100.379C76.9058 101.631 78.2057 102.479 79.3604 101.911L80.93 101.138L83.6531 102.084C84.9604 102.538 86.1855 101.37 85.6414 100.098C85.3685 99.4597 85.043 98.7824 84.6648 98.1311C84.2165 97.3589 83.6572 96.696 83.109 96.1544Z" fill="url(#paint0_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M80.621 76.9661C75.2893 74.5817 66.081 67.1182 68.5935 59.9395C70.9048 53.3357 78.0271 54.0384 80.6889 57.5318C83.3506 54.0384 90.4729 53.3357 92.7842 59.9395C95.2967 67.1182 86.0885 74.5817 80.7567 76.9661V77.026C80.7342 77.0162 80.7115 77.0063 80.6889 76.9962C80.6662 77.0063 80.6435 77.0162 80.621 77.026V76.9661Z" fill="url(#paint1_linear_1767_4154)"/><circle cx="86.0248" cy="59.7474" r="1.06187" fill="#DF9A77"/><circle cx="88.3418" cy="61.0996" r="0.675734" fill="#DF9A77"/><circle cx="88.4369" cy="58.8783" r="0.386133" fill="#DF9A77"/><circle cx="91.7787" cy="47.3353" r="3.3373" fill="#FFE0C8"/><circle cx="99.0612" cy="51.5827" r="2.12373" fill="#FFE0C8"/><circle cx="99.36" cy="44.6042" r="1.21356" fill="#FFE0C8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M40.7937 93.8369C52.5859 91.1354 75.0542 77.539 75.3615 36.6664C75.3615 8.82892 52.5539 -0.47309 34.7679 0.969084C19.6896 2.1917 -3.12375 15.402 0.355936 46.3326C3.50975 74.3665 21.5916 90.6488 36.1768 93.4526C35.3658 94.4287 34.4377 95.6751 33.8045 96.9215C33.3925 97.7324 33.1053 98.6252 32.9052 99.4758C32.5116 101.148 34.2471 102.28 35.7886 101.522L37.8841 100.49L41.5196 101.753C43.265 102.359 44.9005 100.8 44.1741 99.1012C43.8098 98.2492 43.3752 97.345 42.8703 96.4754C42.2719 95.4448 41.5254 94.56 40.7937 93.8369Z" fill="url(#paint2_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M37.4731 68.2193C30.355 65.036 18.0614 55.0719 21.4158 45.4879C24.5015 36.6715 34.0101 37.6096 37.5637 42.2734C41.1173 37.6096 50.6259 36.6715 53.7116 45.4879C57.066 55.0719 44.7725 65.036 37.6543 68.2193V68.2993C37.6242 68.2862 37.594 68.2729 37.5637 68.2595C37.5334 68.2729 37.5032 68.2862 37.4731 68.2993V68.2193Z" fill="url(#paint3_linear_1767_4154)"/><circle cx="44.6891" cy="45.2302" r="1.41765" fill="#FEC1A2"/><circle cx="47.783" cy="47.035" r="0.902141" fill="#FEC1A2"/><circle cx="47.91" cy="44.0702" r="0.515509" fill="#FEC1A2"/><circle cx="52.3656" cy="28.6606" r="4.45547" fill="#FFE0C8"/><circle cx="62.0912" cy="34.3314" r="2.8353" fill="#FFE0C8"/><circle cx="62.4893" cy="25.0147" r="1.62017" fill="#FFE0C8"/><defs><linearGradient id="paint0_linear_1767_4154" x1="80.7769" y1="26.4863" x2="80.7769" y2="102.184" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#C93636"/></linearGradient><linearGradient id="paint1_linear_1767_4154" x1="80.6889" y1="54.9219" x2="73.4298" y2="76.7496" gradientUnits="userSpaceOnUse"><stop stop-color="#FAD5AE"/><stop offset="1" stop-color="#EF8C77"/></linearGradient><linearGradient id="paint2_linear_1767_4154" x1="71.8862" y1="6.16487" x2="19.6082" y2="96.3911" gradientUnits="userSpaceOnUse"><stop stop-color="#FED4A7"/><stop offset="1" stop-color="#F89B89"/></linearGradient><linearGradient id="paint3_linear_1767_4154" x1="37.5637" y1="38.7891" x2="37.5637" y2="68.2993" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#6A4343"/></linearGradient></defs></svg>',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '0660dc31-7d8a-462f-8087-5aacef56c107',
            title: 'Tantillus conatus alveus cibo crudelis perspiciatis suffragium coniuratio spiritus.',
            description:
                'Capio aut civis spargo spargo textilis socius utpote.',
            svg: '<svg width="109" height="103" viewBox="0 0 109 103" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M83.109 96.1544C91.9418 94.1306 108.771 83.9463 109.001 53.3319C109.001 32.4807 91.9174 25.5131 78.595 26.5934C67.3009 27.5092 50.2129 37.4041 52.8193 60.5721C55.1817 81.571 68.7263 93.7671 79.6513 95.8668C79.0438 96.5979 78.3485 97.5316 77.8742 98.4652C77.5656 99.0726 77.3505 99.7414 77.2006 100.379C76.9058 101.631 78.2057 102.479 79.3604 101.911L80.93 101.138L83.6531 102.084C84.9604 102.538 86.1855 101.37 85.6414 100.098C85.3685 99.4597 85.043 98.7824 84.6648 98.1311C84.2165 97.3589 83.6572 96.696 83.109 96.1544Z" fill="url(#paint0_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M80.621 76.9661C75.2893 74.5817 66.081 67.1182 68.5935 59.9395C70.9048 53.3357 78.0271 54.0384 80.6889 57.5318C83.3506 54.0384 90.4729 53.3357 92.7842 59.9395C95.2967 67.1182 86.0885 74.5817 80.7567 76.9661V77.026C80.7342 77.0162 80.7115 77.0063 80.6889 76.9962C80.6662 77.0063 80.6435 77.0162 80.621 77.026V76.9661Z" fill="url(#paint1_linear_1767_4154)"/><circle cx="86.0248" cy="59.7474" r="1.06187" fill="#DF9A77"/><circle cx="88.3418" cy="61.0996" r="0.675734" fill="#DF9A77"/><circle cx="88.4369" cy="58.8783" r="0.386133" fill="#DF9A77"/><circle cx="91.7787" cy="47.3353" r="3.3373" fill="#FFE0C8"/><circle cx="99.0612" cy="51.5827" r="2.12373" fill="#FFE0C8"/><circle cx="99.36" cy="44.6042" r="1.21356" fill="#FFE0C8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M40.7937 93.8369C52.5859 91.1354 75.0542 77.539 75.3615 36.6664C75.3615 8.82892 52.5539 -0.47309 34.7679 0.969084C19.6896 2.1917 -3.12375 15.402 0.355936 46.3326C3.50975 74.3665 21.5916 90.6488 36.1768 93.4526C35.3658 94.4287 34.4377 95.6751 33.8045 96.9215C33.3925 97.7324 33.1053 98.6252 32.9052 99.4758C32.5116 101.148 34.2471 102.28 35.7886 101.522L37.8841 100.49L41.5196 101.753C43.265 102.359 44.9005 100.8 44.1741 99.1012C43.8098 98.2492 43.3752 97.345 42.8703 96.4754C42.2719 95.4448 41.5254 94.56 40.7937 93.8369Z" fill="url(#paint2_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M37.4731 68.2193C30.355 65.036 18.0614 55.0719 21.4158 45.4879C24.5015 36.6715 34.0101 37.6096 37.5637 42.2734C41.1173 37.6096 50.6259 36.6715 53.7116 45.4879C57.066 55.0719 44.7725 65.036 37.6543 68.2193V68.2993C37.6242 68.2862 37.594 68.2729 37.5637 68.2595C37.5334 68.2729 37.5032 68.2862 37.4731 68.2993V68.2193Z" fill="url(#paint3_linear_1767_4154)"/><circle cx="44.6891" cy="45.2302" r="1.41765" fill="#FEC1A2"/><circle cx="47.783" cy="47.035" r="0.902141" fill="#FEC1A2"/><circle cx="47.91" cy="44.0702" r="0.515509" fill="#FEC1A2"/><circle cx="52.3656" cy="28.6606" r="4.45547" fill="#FFE0C8"/><circle cx="62.0912" cy="34.3314" r="2.8353" fill="#FFE0C8"/><circle cx="62.4893" cy="25.0147" r="1.62017" fill="#FFE0C8"/><defs><linearGradient id="paint0_linear_1767_4154" x1="80.7769" y1="26.4863" x2="80.7769" y2="102.184" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#C93636"/></linearGradient><linearGradient id="paint1_linear_1767_4154" x1="80.6889" y1="54.9219" x2="73.4298" y2="76.7496" gradientUnits="userSpaceOnUse"><stop stop-color="#FAD5AE"/><stop offset="1" stop-color="#EF8C77"/></linearGradient><linearGradient id="paint2_linear_1767_4154" x1="71.8862" y1="6.16487" x2="19.6082" y2="96.3911" gradientUnits="userSpaceOnUse"><stop stop-color="#FED4A7"/><stop offset="1" stop-color="#F89B89"/></linearGradient><linearGradient id="paint3_linear_1767_4154" x1="37.5637" y1="38.7891" x2="37.5637" y2="68.2993" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#6A4343"/></linearGradient></defs></svg>',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
    ],
    about: {
        id: 'b98d5274-9686-4b02-a256-cc81bcee3dd6',
        title: 'Mawaddah Indonesia',
        description:
            "Mawaddah Indonesia adalah wadah Ta'aruf binaan langsung Ustadz Khalid Basalamah yang mengutamakan proses Syar'i dalam memperoleh pasangan hidup yang Allah Ridhai.",
        footer_description:
            'Mawaddah indonesia adalah wadah untuk antum semua yang sedang ikhtiar mencari pasangan yang Shalih dengan cara yang Allah ridhai. Kami memfasilitasi semua proses nya dari mulai upload CV antum sampai terjadinya acara pernikahan, semua itu kami kawal dengan ketentuan (Syari’at) Rab kami Allah Subhanahu Wata’ala yang maha Agung dan Maha Suci.',
        createdAt: '2024-12-10T02:24:19.967Z',
        updatedAt: '2024-12-10T02:24:19.967Z',
    },
    social_media: [
        {
            id: 'c8013e86-b158-4ce9-bb45-77d210aa4c05',
            icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1767_4213" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22"><path d="M0.757812 0.453125H21.7578V21.4531H0.757812V0.453125Z" fill="white"/></mask><g mask="url(#mask0_1767_4213)" ><path d="M17.2953 1.4375H20.5158L13.4808 9.4985L21.7578 20.4695H15.2778L10.1988 13.817L4.39381 20.4695H1.17031L8.69431 11.8445L0.757812 1.439H7.40281L11.9868 7.5185L17.2953 1.4375ZM16.1628 18.5375H17.9478L6.42781 3.269H4.51381L16.1628 18.5375Z" fill = "#4D3B40" /></g></svg>',
            url: 'https://www.facebook.com',
            text: 'ustadzkhalid',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '4a2a3ee6-a897-469d-8fee-5de3a0a0688e',
            icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1767_4213" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22"><path d="M0.757812 0.453125H21.7578V21.4531H0.757812V0.453125Z" fill="white"/></mask><g mask="url(#mask0_1767_4213)" ><path d="M17.2953 1.4375H20.5158L13.4808 9.4985L21.7578 20.4695H15.2778L10.1988 13.817L4.39381 20.4695H1.17031L8.69431 11.8445L0.757812 1.439H7.40281L11.9868 7.5185L17.2953 1.4375ZM16.1628 18.5375H17.9478L6.42781 3.269H4.51381L16.1628 18.5375Z" fill = "#4D3B40" /></g></svg>',
            url: 'https://www.twitter.com',
            text: 'ustadzkhalid',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '9c556657-cbaf-4bae-b65e-81c094ae2171',
            icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1767_4213" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22"><path d="M0.757812 0.453125H21.7578V21.4531H0.757812V0.453125Z" fill="white"/></mask><g mask="url(#mask0_1767_4213)" ><path d="M17.2953 1.4375H20.5158L13.4808 9.4985L21.7578 20.4695H15.2778L10.1988 13.817L4.39381 20.4695H1.17031L8.69431 11.8445L0.757812 1.439H7.40281L11.9868 7.5185L17.2953 1.4375ZM16.1628 18.5375H17.9478L6.42781 3.269H4.51381L16.1628 18.5375Z" fill = "#4D3B40" /></g></svg>',
            url: 'https://www.instagram.com',
            text: 'ustadzkhalid',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '0294fef0-3d08-4874-ab29-4580786f2674',
            icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1767_4213" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22"><path d="M0.757812 0.453125H21.7578V21.4531H0.757812V0.453125Z" fill="white"/></mask><g mask="url(#mask0_1767_4213)" ><path d="M17.2953 1.4375H20.5158L13.4808 9.4985L21.7578 20.4695H15.2778L10.1988 13.817L4.39381 20.4695H1.17031L8.69431 11.8445L0.757812 1.439H7.40281L11.9868 7.5185L17.2953 1.4375ZM16.1628 18.5375H17.9478L6.42781 3.269H4.51381L16.1628 18.5375Z" fill = "#4D3B40" /></g></svg>',
            url: 'https://www.linkedin.com',
            text: 'ustadzkhalid',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
        {
            id: '032aca14-e405-46c7-bf0f-bf684a5db591',
            icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1767_4213" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22"><path d="M0.757812 0.453125H21.7578V21.4531H0.757812V0.453125Z" fill="white"/></mask><g mask="url(#mask0_1767_4213)" ><path d="M17.2953 1.4375H20.5158L13.4808 9.4985L21.7578 20.4695H15.2778L10.1988 13.817L4.39381 20.4695H1.17031L8.69431 11.8445L0.757812 1.439H7.40281L11.9868 7.5185L17.2953 1.4375ZM16.1628 18.5375H17.9478L6.42781 3.269H4.51381L16.1628 18.5375Z" fill = "#4D3B40" /></g></svg>',
            url: 'https://www.youtube.com',
            text: 'ustadzkhalid',
            createdAt: '2024-12-10T02:24:19.967Z',
            updatedAt: '2024-12-10T02:24:19.967Z',
        },
    ],
};

const sampleMainSlide = {
    id: '6e79d2e3-92ad-4c12-8fa0-8b92163904da',
    text: 'Terebro annus ter teneo sub cinis arcesso quis vado.',
    image: 'https://picsum.photos/seed/eRZaz6YhQu/640/480',
    createdAt: '2024-12-10T02:24:19.967Z',
    updatedAt: '2024-12-10T02:24:19.967Z',
};

const sampleProcessStep = {
    id: 'abdf6922-7fc9-4ccf-aa7e-6f525fb5f66a',
    title: 'Nisi via delectatio terra.',
    description:
        'Bestia ancilla facilis conitor cresco laudantium audacia reiciendis tunc quo.',
    svg: '<svg width="109" height="103" viewBox="0 0 109 103" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M83.109 96.1544C91.9418 94.1306 108.771 83.9463 109.001 53.3319C109.001 32.4807 91.9174 25.5131 78.595 26.5934C67.3009 27.5092 50.2129 37.4041 52.8193 60.5721C55.1817 81.571 68.7263 93.7671 79.6513 95.8668C79.0438 96.5979 78.3485 97.5316 77.8742 98.4652C77.5656 99.0726 77.3505 99.7414 77.2006 100.379C76.9058 101.631 78.2057 102.479 79.3604 101.911L80.93 101.138L83.6531 102.084C84.9604 102.538 86.1855 101.37 85.6414 100.098C85.3685 99.4597 85.043 98.7824 84.6648 98.1311C84.2165 97.3589 83.6572 96.696 83.109 96.1544Z" fill="url(#paint0_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M80.621 76.9661C75.2893 74.5817 66.081 67.1182 68.5935 59.9395C70.9048 53.3357 78.0271 54.0384 80.6889 57.5318C83.3506 54.0384 90.4729 53.3357 92.7842 59.9395C95.2967 67.1182 86.0885 74.5817 80.7567 76.9661V77.026C80.7342 77.0162 80.7115 77.0063 80.6889 76.9962C80.6662 77.0063 80.6435 77.0162 80.621 77.026V76.9661Z" fill="url(#paint1_linear_1767_4154)"/><circle cx="86.0248" cy="59.7474" r="1.06187" fill="#DF9A77"/><circle cx="88.3418" cy="61.0996" r="0.675734" fill="#DF9A77"/><circle cx="88.4369" cy="58.8783" r="0.386133" fill="#DF9A77"/><circle cx="91.7787" cy="47.3353" r="3.3373" fill="#FFE0C8"/><circle cx="99.0612" cy="51.5827" r="2.12373" fill="#FFE0C8"/><circle cx="99.36" cy="44.6042" r="1.21356" fill="#FFE0C8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M40.7937 93.8369C52.5859 91.1354 75.0542 77.539 75.3615 36.6664C75.3615 8.82892 52.5539 -0.47309 34.7679 0.969084C19.6896 2.1917 -3.12375 15.402 0.355936 46.3326C3.50975 74.3665 21.5916 90.6488 36.1768 93.4526C35.3658 94.4287 34.4377 95.6751 33.8045 96.9215C33.3925 97.7324 33.1053 98.6252 32.9052 99.4758C32.5116 101.148 34.2471 102.28 35.7886 101.522L37.8841 100.49L41.5196 101.753C43.265 102.359 44.9005 100.8 44.1741 99.1012C43.8098 98.2492 43.3752 97.345 42.8703 96.4754C42.2719 95.4448 41.5254 94.56 40.7937 93.8369Z" fill="url(#paint2_linear_1767_4154)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M37.4731 68.2193C30.355 65.036 18.0614 55.0719 21.4158 45.4879C24.5015 36.6715 34.0101 37.6096 37.5637 42.2734C41.1173 37.6096 50.6259 36.6715 53.7116 45.4879C57.066 55.0719 44.7725 65.036 37.6543 68.2193V68.2993C37.6242 68.2862 37.594 68.2729 37.5637 68.2595C37.5334 68.2729 37.5032 68.2862 37.4731 68.2993V68.2193Z" fill="url(#paint3_linear_1767_4154)"/><circle cx="44.6891" cy="45.2302" r="1.41765" fill="#FEC1A2"/><circle cx="47.783" cy="47.035" r="0.902141" fill="#FEC1A2"/><circle cx="47.91" cy="44.0702" r="0.515509" fill="#FEC1A2"/><circle cx="52.3656" cy="28.6606" r="4.45547" fill="#FFE0C8"/><circle cx="62.0912" cy="34.3314" r="2.8353" fill="#FFE0C8"/><circle cx="62.4893" cy="25.0147" r="1.62017" fill="#FFE0C8"/><defs><linearGradient id="paint0_linear_1767_4154" x1="80.7769" y1="26.4863" x2="80.7769" y2="102.184" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#C93636"/></linearGradient><linearGradient id="paint1_linear_1767_4154" x1="80.6889" y1="54.9219" x2="73.4298" y2="76.7496" gradientUnits="userSpaceOnUse"><stop stop-color="#FAD5AE"/><stop offset="1" stop-color="#EF8C77"/></linearGradient><linearGradient id="paint2_linear_1767_4154" x1="71.8862" y1="6.16487" x2="19.6082" y2="96.3911" gradientUnits="userSpaceOnUse"><stop stop-color="#FED4A7"/><stop offset="1" stop-color="#F89B89"/></linearGradient><linearGradient id="paint3_linear_1767_4154" x1="37.5637" y1="38.7891" x2="37.5637" y2="68.2993" gradientUnits="userSpaceOnUse"><stop stop-color="#D08484"/><stop offset="1" stop-color="#6A4343"/></linearGradient></defs></svg>',
    createdAt: '2024-12-10T02:24:19.967Z',
    updatedAt: '2024-12-10T02:24:19.967Z',
};

const sampleAbout = {
    id: 'b98d5274-9686-4b02-a256-cc81bcee3dd6',
    title: 'Mawaddah Indonesia',
    description:
        "Mawaddah Indonesia adalah wadah Ta'aruf binaan langsung Ustadz Khalid Basalamah yang mengutamakan proses Syar'i dalam memperoleh pasangan hidup yang Allah Ridhai.",
    footer_description:
        'Mawaddah indonesia adalah wadah untuk antum semua yang sedang ikhtiar mencari pasangan yang Shalih dengan cara yang Allah ridhai. Kami memfasilitasi semua proses nya dari mulai upload CV antum sampai terjadinya acara pernikahan, semua itu kami kawal dengan ketentuan (Syari’at) Rab kami Allah Subhanahu Wata’ala yang maha Agung dan Maha Suci.',
    createdAt: '2024-12-10T02:24:19.967Z',
    updatedAt: '2024-12-10T02:24:19.967Z',
};

const sampleSocialMedia = {
    id: 'c8013e86-b158-4ce9-bb45-77d210aa4c05',
    icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1767_4213" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22"><path d="M0.757812 0.453125H21.7578V21.4531H0.757812V0.453125Z" fill="white"/></mask><g mask="url(#mask0_1767_4213)" ><path d="M17.2953 1.4375H20.5158L13.4808 9.4985L21.7578 20.4695H15.2778L10.1988 13.817L4.39381 20.4695H1.17031L8.69431 11.8445L0.757812 1.439H7.40281L11.9868 7.5185L17.2953 1.4375ZM16.1628 18.5375H17.9478L6.42781 3.269H4.51381L16.1628 18.5375Z" fill = "#4D3B40" /></g></svg>',
    url: 'https://www.facebook.com',
    text: 'ustadzkhalid',
    createdAt: '2024-12-10T02:24:19.967Z',
    updatedAt: '2024-12-10T02:24:19.967Z',
};