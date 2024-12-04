import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

export async function LandingPageSeed(prisma: PrismaClient) {
    console.log('\nSeed Start: Landing Page');
    const main_slides: Prisma.MainSlideCreateWithoutLandingPageInput[] = [];
    for (let i = 0; i < 100; i++) {
        main_slides.push({
            text: faker.lorem.sentence(),
            image: faker.image.urlPicsumPhotos(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    var svg: string = `<svg width="109" height="103" viewBox="0 0 109 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M83.109 96.1544C91.9418 94.1306 108.771 83.9463 109.001 53.3319C109.001 32.4807 91.9174 25.5131 78.595 26.5934C67.3009 27.5092 50.2129 37.4041 52.8193 60.5721C55.1817 81.571 68.7263 93.7671 79.6513 95.8668C79.0438 96.5979 78.3485 97.5316 77.8742 98.4652C77.5656 99.0726 77.3505 99.7414 77.2006 100.379C76.9058 101.631 78.2057 102.479 79.3604 101.911L80.93 101.138L83.6531 102.084C84.9604 102.538 86.1855 101.37 85.6414 100.098C85.3685 99.4597 85.043 98.7824 84.6648 98.1311C84.2165 97.3589 83.6572 96.696 83.109 96.1544Z" fill="url(#paint0_linear_1767_4154)"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M80.621 76.9661C75.2893 74.5817 66.081 67.1182 68.5935 59.9395C70.9048 53.3357 78.0271 54.0384 80.6889 57.5318C83.3506 54.0384 90.4729 53.3357 92.7842 59.9395C95.2967 67.1182 86.0885 74.5817 80.7567 76.9661V77.026C80.7342 77.0162 80.7115 77.0063 80.6889 76.9962C80.6662 77.0063 80.6435 77.0162 80.621 77.026V76.9661Z" fill="url(#paint1_linear_1767_4154)"/>
                        <circle cx="86.0248" cy="59.7474" r="1.06187" fill="#DF9A77"/>
                        <circle cx="88.3418" cy="61.0996" r="0.675734" fill="#DF9A77"/>
                        <circle cx="88.4369" cy="58.8783" r="0.386133" fill="#DF9A77"/>
                        <circle cx="91.7787" cy="47.3353" r="3.3373" fill="#FFE0C8"/>
                        <circle cx="99.0612" cy="51.5827" r="2.12373" fill="#FFE0C8"/>
                        <circle cx="99.36" cy="44.6042" r="1.21356" fill="#FFE0C8"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M40.7937 93.8369C52.5859 91.1354 75.0542 77.539 75.3615 36.6664C75.3615 8.82892 52.5539 -0.47309 34.7679 0.969084C19.6896 2.1917 -3.12375 15.402 0.355936 46.3326C3.50975 74.3665 21.5916 90.6488 36.1768 93.4526C35.3658 94.4287 34.4377 95.6751 33.8045 96.9215C33.3925 97.7324 33.1053 98.6252 32.9052 99.4758C32.5116 101.148 34.2471 102.28 35.7886 101.522L37.8841 100.49L41.5196 101.753C43.265 102.359 44.9005 100.8 44.1741 99.1012C43.8098 98.2492 43.3752 97.345 42.8703 96.4754C42.2719 95.4448 41.5254 94.56 40.7937 93.8369Z" fill="url(#paint2_linear_1767_4154)"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37.4731 68.2193C30.355 65.036 18.0614 55.0719 21.4158 45.4879C24.5015 36.6715 34.0101 37.6096 37.5637 42.2734C41.1173 37.6096 50.6259 36.6715 53.7116 45.4879C57.066 55.0719 44.7725 65.036 37.6543 68.2193V68.2993C37.6242 68.2862 37.594 68.2729 37.5637 68.2595C37.5334 68.2729 37.5032 68.2862 37.4731 68.2993V68.2193Z" fill="url(#paint3_linear_1767_4154)"/>
                        <circle cx="44.6891" cy="45.2302" r="1.41765" fill="#FEC1A2"/>
                        <circle cx="47.783" cy="47.035" r="0.902141" fill="#FEC1A2"/>
                        <circle cx="47.91" cy="44.0702" r="0.515509" fill="#FEC1A2"/>
                        <circle cx="52.3656" cy="28.6606" r="4.45547" fill="#FFE0C8"/>
                        <circle cx="62.0912" cy="34.3314" r="2.8353" fill="#FFE0C8"/>
                        <circle cx="62.4893" cy="25.0147" r="1.62017" fill="#FFE0C8"/>
                        <defs>
                        <linearGradient id="paint0_linear_1767_4154" x1="80.7769" y1="26.4863" x2="80.7769" y2="102.184" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#D08484"/>
                        <stop offset="1" stop-color="#C93636"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_1767_4154" x1="80.6889" y1="54.9219" x2="73.4298" y2="76.7496" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FAD5AE"/>
                        <stop offset="1" stop-color="#EF8C77"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_1767_4154" x1="71.8862" y1="6.16487" x2="19.6082" y2="96.3911" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FED4A7"/>
                        <stop offset="1" stop-color="#F89B89"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_1767_4154" x1="37.5637" y1="38.7891" x2="37.5637" y2="68.2993" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#D08484"/>
                        <stop offset="1" stop-color="#6A4343"/>
                        </linearGradient>
                        </defs>
                        </svg>
                        `;

    var icon: string = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1767_4213" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                        <path d="M0.757812 0.453125H21.7578V21.4531H0.757812V0.453125Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_1767_4213)">
                        <path d="M17.2953 1.4375H20.5158L13.4808 9.4985L21.7578 20.4695H15.2778L10.1988 13.817L4.39381 20.4695H1.17031L8.69431 11.8445L0.757812 1.439H7.40281L11.9868 7.5185L17.2953 1.4375ZM16.1628 18.5375H17.9478L6.42781 3.269H4.51381L16.1628 18.5375Z" fill="#4D3B40"/>
                        </g>
                        </svg>
                        `;

    const process_steps: Prisma.ProcessStepCreateWithoutLandingPageInput[] = [];
    for (let i = 0; i < 100; i++) {
        process_steps.push({
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
            svg,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    const about: Prisma.AboutCreateWithoutLandingPageInput = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const social_media: Prisma.SocialMediaCreateWithoutLandingPageInput[] = [];
    for (let i = 0; i < 100; i++) {
        social_media.push({
            icon,
            url: faker.internet.url(),
            text: faker.lorem.sentence(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    const blog: Prisma.BlogCreateWithoutLandingPageInput[] = [];
    for (let i = 0; i < 100; i++) {
        blog.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.sentence(),
            image: faker.image.urlPicsumPhotos(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    await prisma.landingPage.create({
        data: {
            main_slide: { createMany: { data: main_slides } },
            process_step: { createMany: { data: process_steps } },
            about: { create: about },
            social_media: { createMany: { data: social_media } },
            blog: { createMany: { data: blog } },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
    console.log('\nSeed Finish: Landing Page');
}
