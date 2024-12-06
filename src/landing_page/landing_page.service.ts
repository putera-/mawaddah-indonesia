import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateMainSlideDto } from './dto/update-main_slide.dto';
import { UpdateProcessStepDto } from './dto/update-process_step.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { CreateMainSlideDto } from './dto/create-main_slide.dto';
import { CreateProcessStepDto } from './dto/create-process_step.dto';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LandingPageService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        let result: any = await this.prisma.landingPage.findFirst({
            include: {
                main_slide: true,
                process_step: true,
                about: true,
                social_media: true,
            },
        });

        if (!result) {
            result = await this.prisma.landingPage.create({
                data: {
                    about: {
                        create: {
                            title: '-',
                            description: '-',
                            footer_description: '-',
                        }
                    }
                },
                include: {
                    main_slide: true,
                    process_step: true,
                    about: true,
                    social_media: true,
                }
            })
        }

        const blogs = await this.prisma.blog.findMany({
            take: 2,
        });

        return {
            ...result,
            blogs
        };
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
        const dt = await this.prisma.processStep.findUnique({
            where: { id: processStepId }
        });
        if (!dt) throw new BadRequestException('Data tidak ditemukan');

        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.processStep.update({
            where: { id: processStepId },
            data,
        });
    }

    async removeProcessStep(id: string) {
        const dt = await this.prisma.processStep.findUnique({
            where: { id }
        });

        if (!dt) throw new BadRequestException('Data tidak ditemukan');

        return await this.prisma.processStep.delete({
            where: { id }
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
        const dt = await this.prisma.socialMedia.findUnique({
            where: { id: socialMediaId }
        });
        if (!dt) throw new BadRequestException('Data tidak ditemukan');
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.socialMedia.update({
            where: { id: socialMediaId },
            data,
        });
    }

    async removeSocialMedia(id: string) {
        const dt = await this.prisma.socialMedia.findUnique({
            where: { id }
        });

        if (!dt) throw new BadRequestException('Data tidak ditemukan');

        return await this.prisma.socialMedia.delete({
            where: { id }
        });
    }
}
