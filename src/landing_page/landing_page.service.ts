import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateMainSlideDto } from './dto/update-main_slide.dto';
import { UpdateProcessStepDto } from './dto/update-process_step.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateMainSlideDto } from './dto/create-main_slide.dto';
import { CreateProcessStepDto } from './dto/create-process_step.dto';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { Prisma } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class LandingPageService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        const result = await this.prisma.landingPage.findFirstOrThrow({
            include: {
                main_slide: true,
                process_step: true,
                about: true,
                social_media: true,
            },
        });

        if (!result.about) {
            const dataAbout: Prisma.AboutCreateInput = {
                title: '-',
                description: '-',
                LandingPage: {
                    connect: {
                        id: result.id,
                    },
                },
            };
            result.about = await this.updateAbout(result.id, dataAbout);
        }

        return result;
    }

    async createMainSlide(data: CreateMainSlideDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.mainSlide.create({
            data,
        });
    }

    async updateMainSlide(slideId: string, data: UpdateMainSlideDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.mainSlide.update({
            where: { id: slideId },
            data,
        });
    }

    async createProcessStep(data: CreateProcessStepDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.processStep.create({
            data,
        });
    }

    async updateProcessStep(processStepId: string, data: UpdateProcessStepDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.processStep.update({
            where: { id: processStepId },
            data,
        });
    }

    async updateAbout(landingPageId: string, data: Prisma.AboutCreateInput) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.about.upsert({
            where: { landingPageId },
            update: data,
            create: data,
        });
    }

    async createSocialMedia(data: CreateSocialMediaDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.socialMedia.create({
            data,
        });
    }

    async updateSocialMedia(socialMediaId: string, data: UpdateSocialMediaDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.socialMedia.update({
            where: { id: socialMediaId },
            data,
        });
    }

    async createBlog(data: CreateBlogDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.blog.create({
            data,
        });
    }

    async updateBlog(blogId: string, data: UpdateBlogDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.blog.update({
            where: { id: blogId },
            data,
        });
    }
}
