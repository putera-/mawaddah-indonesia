import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLandingPageDto } from './dto/create-landing_page.dto';
import { UpdateLandingPageDto } from './dto/update-landing_page.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LandingPageService {
    constructor(private PrismaService: PrismaService) {}

    async getAll() {
        return await this.PrismaService.landingPage.findFirstOrThrow({
            include: {
                main_slide: true,
                process_step: true,
                about: true,
                social_media: true,
            },
        });
    }

    async updateMainSlide(id: string, data: UpdateLandingPageDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.PrismaService.mainSlide.update({
            where: { id },
            data,
        });
    }

    async updateProcessStep(id: string, data: UpdateLandingPageDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.PrismaService.processStep.update({
            where: { id },
            data,
        });
    }

    async updateAbout(data: UpdateLandingPageDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        // TODO fix 
        // return await this.PrismaService.about.upsert(data);
    }

    async updateSocialMedia(id: string, data: UpdateLandingPageDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.PrismaService.mainSlide.update({
            where: { id },
            data,
        });
    }

    async updateBlog(id: string, data: UpdateLandingPageDto) {
        if (!data) throw new BadRequestException('Data tidak boleh kosong');
        return await this.PrismaService.mainSlide.update({
            where: { id },
            data,
        });
    }
}
