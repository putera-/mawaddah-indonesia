import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UploadedFile,
    UseInterceptors,
    ValidationPipe,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import path from 'path';
import { UpdateAboutDto } from './dto/update-about.dto';

@ApiBearerAuth()
@ApiTags('Landing Page')
@Controller('landing-page')
export class LandingPageController {
    constructor(
        private readonly landingPageService: LandingPageService,
        private photoService: PhotosService,
    ) { }

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

    @Public()
    @Get('main-slide')
    async getMainSlide() {
        try {
            return await this.landingPageService.getMainSlide();
        } catch (error) {
            throw error;
        }
    }

    @CreateMainSlideDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post('main-slide')
    @UseInterceptors(FileInterceptor('image'))
    async createMainSlide(@Body() createMainSlideDto: CreateMainSlideDto, @UploadedFile() file: Express.Multer.File) {
        // for image
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        try {

            const data: Prisma.MainSlideCreateInput = {
                ...createMainSlideDto,
                image: '',
                image_md: '',
            };
            if (file) {
                const fileBuffer = file.buffer;

                // resize images to 600, 900, 1200
                const sizes = [
                    { key: 'md', size: 900 },
                    { key: 'lg', size: 1200 },
                ];
                await Promise.all(
                    sizes.map(async (s) => {
                        const { key, size } = s;
                        const filename = `${uniqueSuffix}_${key}.${ext}`;
                        const filepath = path.join(
                            './public/slides/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            fileBuffer,
                            filepath,
                        );
                    }),
                );

                data.image = `/slides/${uniqueSuffix}_lg.${ext}`;
                data.image_md = `/slides/${uniqueSuffix}_md.${ext}`;
            }
            return await this.landingPageService.createMainSlide(data);
        } catch (error) {
            // remove image
            if (file) {
                this.photoService.removeFile(
                    `/public/slides/${uniqueSuffix}_lg.${ext}`,
                );
                this.photoService.removeFile(
                    `/public/slides/${uniqueSuffix}_md.${ext}`,
                );
            }
            throw error;
        }
    }

    @UpdateMainSlideDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch('main-slide/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateMainSlide(
        @Param('id') slideId: string,
        @Body() updateMainSlideDto: UpdateMainSlideDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        // for image
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        try {

            const data: Prisma.MainSlideUpdateInput = {
                ...updateMainSlideDto,
            };


            if (file) {
                const fileBuffer = file.buffer;

                // resize images to 600, 900, 1200
                const sizes = [
                    { key: 'md', size: 900 },
                    { key: 'lg', size: 1200 },
                ];
                await Promise.all(
                    sizes.map(async (s) => {
                        const { key, size } = s;
                        const filename = `${uniqueSuffix}_${key}.${ext}`;
                        const filepath = path.join(
                            './public/slides/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            fileBuffer,
                            filepath,
                        );
                    }),
                );

                data.image = `/slides/${uniqueSuffix}_lg.${ext}`;
                data.image_md = `/slides/${uniqueSuffix}_md.${ext}`;
            }

            return await this.landingPageService.updateMainSlide(slideId, data);
        } catch (error) {
            // remove image
            if (file) {
                this.photoService.removeFile(
                    `/public/slides/${uniqueSuffix}_lg.${ext}`,
                );
                this.photoService.removeFile(
                    `/public/slides/${uniqueSuffix}_md.${ext}`,
                );
            }

            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin)
    @HttpCode(204)
    @Delete('main-slide/:id')
    removeMainSlide(@Param('id') id: string) {
        try {
            return this.landingPageService.removeMainSlide(id);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get('process-step')
    async getProcessStep() {
        try {
            return await this.landingPageService.getProcessStep();
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
        // TODO ValidationPipe
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

    // GET ABOUT
    @Get('about')
    async getAbout() {
        try {
            return await this.landingPageService.getAbout();
        } catch (error) {
            throw error;
        }
    }

    @UpdateAboutDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch('about')
    async updateAbout(
        @Param('id') aboutId: string,
        @Body(new ValidationPipe()) data: UpdateAboutDto
    ) {
        try {
            return await this.landingPageService.updateAbout(data);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get('social-media')
    async getSocialMedia() {
        try {
            return await this.landingPageService.getSocialMedia();
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
