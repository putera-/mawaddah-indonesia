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
        const main_slide = await this.prisma.mainSlide.findMany({});
        const process_step = await this.prisma.processStep.findMany({});
        const about = await this.prisma.about.findFirst({});
        const social_media = await this.prisma.socialMedia.findMany({});

        return {
            main_slide,
            process_step,
            about,
            social_media,
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

    async updateAbout(aboutId: string, data: Prisma.AboutCreateInput) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.prisma.about.upsert({
            where: {
                id: aboutId,
            },
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
