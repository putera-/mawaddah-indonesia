import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
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
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
    CreateBlogDoc,
    CreateMainSlideDoc,
    CreateProcessStepDoc,
    CreateSocialMediaDoc,
    GetLandingPageDoc,
    UpdateAboutDoc,
    UpdateBlogDoc,
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
        console.log('masuk nih');
        return await this.landingPageService.getAll();
    }

    @CreateMainSlideDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    async createMainSlide(data: CreateMainSlideDto) {
        return await this.landingPageService.createMainSlide(data);
    }

    @UpdateMainSlideDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    async updateMainSlide(
        @Param('id') slideId: string,
        @Body() data: UpdateMainSlideDto,
    ) {
        return await this.landingPageService.updateMainSlide(slideId, data);
    }

    @CreateProcessStepDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    async createProcessStep(data: CreateProcessStepDto) {
        return await this.landingPageService.createProcessStep(data);
    }

    @UpdateProcessStepDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    async updateProcessStep(
        @Param('id') processStepId: string,
        @Body() data: UpdateProcessStepDto,
    ) {
        return await this.landingPageService.updateProcessStep(
            processStepId,
            data,
        );
    }

    @UpdateAboutDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    async updateAbout(
        @Param('id') landingPageId: string,
        @Body() data: Prisma.AboutCreateInput,
    ) {
        return await this.landingPageService.updateAbout(landingPageId, data);
    }

    @CreateSocialMediaDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    async createSocialMedia(data: CreateSocialMediaDto) {
        return await this.landingPageService.createSocialMedia(data);
    }

    @UpdateSocialMediaDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    async updateSocialMedia(
        @Param('id') socialMediaId: string,
        @Body() data: UpdateSocialMediaDto,
    ) {
        return await this.landingPageService.updateSocialMedia(
            socialMediaId,
            data,
        );
    }

    @CreateBlogDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    async createBlog(data: CreateBlogDto) {
        return await this.landingPageService.createBlog(data);
    }

    @UpdateBlogDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    async updateBlog(@Param('id') blogId: string, @Body() data: UpdateBlogDto) {
        return await this.landingPageService.updateBlog(blogId, data);
    }
}
