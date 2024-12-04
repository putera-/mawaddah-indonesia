import {
    About,
    Blog,
    MainSlide,
    ProcessStep,
    SocialMedia,
} from '@prisma/client';

export interface Landing_page {
    id: string;
    main_slide?: MainSlide;
    process_step?: ProcessStep;
    about?: About;
    social_media?: SocialMedia;
    blog?: Blog;
    createdAt: Date;
    updatedAt: Date;
}
