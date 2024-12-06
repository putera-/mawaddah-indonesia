import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { LandingPageService } from './landing_page.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { CreateMainSlideDto } from './dto/create-main_slide.dto';
import { CreateProcessStepDto } from './dto/create-process_step.dto';
import { UpdateMainSlideDto } from './dto/update-main_slide.dto';
import { UpdateProcessStepDto } from './dto/update-process_step.dto';
import { Prisma } from '@prisma/client';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import {
    CreateMainSlideDoc,
    CreateProcessStepDoc,
    CreateSocialMediaDoc,
    GetLandingPageDoc,
    UpdateAboutDoc,
    UpdateMainSlideDoc,
    UpdateProcessStepDoc,
    UpdateSocialMediaDoc,
} from './landing_page.doc';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.metadata';

@ApiBearerAuth()
@ApiTags('Landing Page')
@Controller('landing-page')
export class LandingPageController {
    constructor(private readonly landingPageService: LandingPageService) { }

    @GetLandingPageDoc()
    @Public()
    @Get()
    async getLandingPage() {
        try {
            return await this.landingPageService.getAll();
        } catch (error) {
            throw error;
        }
    }

    @CreateMainSlideDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post('main-slide')
    async createMainSlide(@Body() data: CreateMainSlideDto) {
        try {
            return await this.landingPageService.createMainSlide(data);
        } catch (error) {
            throw error;
        }
    }

    @UpdateMainSlideDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch('main-slide/:id')
    async updateMainSlide(
        @Param('id') slideId: string,
        @Body() data: UpdateMainSlideDto,
    ) {
        try {
            return await this.landingPageService.updateMainSlide(slideId, data);
        } catch (error) {
            throw error;
        }
    }

    @CreateProcessStepDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post('process-step')
    async createProcessStep(@Body() data: CreateProcessStepDto) {
        try {
            return await this.landingPageService.createProcessStep(data);
        } catch (error) {
            throw error;
        }
    }

    @UpdateProcessStepDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch('process-step/:id')
    async updateProcessStep(
        @Param('id') processStepId: string,
        @Body() data: UpdateProcessStepDto,
    ) {
        try {
            return await this.landingPageService.updateProcessStep(
                processStepId,
                data,
            );
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin)
    @HttpCode(204)
    @Delete('process-step/:id')
    removeProcessStep(@Param('id') id: string) {
        try {
            return this.landingPageService.removeProcessStep(id);
        } catch (error) {
            throw error;
        }
    }

    @UpdateAboutDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch('about/:id')
    async updateAbout(
        @Param('id') landingPageId: string,
        @Body() data: Prisma.AboutCreateInput,
    ) {
        try {
            return await this.landingPageService.updateAbout(landingPageId, data);
        } catch (error) {
            throw error;
        }
    }

    @CreateSocialMediaDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post('social-media')
    async createSocialMedia(@Body() data: CreateSocialMediaDto) {
        try {
            return await this.landingPageService.createSocialMedia(data);
        } catch (error) {
            throw error;
        }
    }

    @UpdateSocialMediaDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch('social-media/:id')
    async updateSocialMedia(
        @Param('id') socialMediaId: string,
        @Body() data: UpdateSocialMediaDto,
    ) {
        try {
            return await this.landingPageService.updateSocialMedia(
                socialMediaId,
                data,
            );
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin)
    @HttpCode(204)
    @Delete('social-media/:id')
    removeSocialMedia(@Param('id') id: string) {
        try {
            return this.landingPageService.removeSocialMedia(id);
        } catch (error) {
            throw error;
        }
    }
}
