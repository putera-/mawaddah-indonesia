import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ValidationPipe,
    UploadedFile,
    HttpCode,
} from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import * as path from 'path';
import { AppService } from 'src/app.service';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { Public } from 'src/auth/auth.metadata';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateGalleryDoc,
    GetAllGalleriesDoc,
    GetGalleryByIdDoc,
    RemoveGalleryDoc,
    UpdateGalleryDoc,
} from './galleries.doc';

@ApiTags('Gallery')
@Controller('galleries')
export class GalleriesController {
    constructor(
        private readonly galleriesService: GalleriesService,
        private readonly photoService: PhotosService,
        private readonly appService: AppService,
    ) {}

    @CreateGalleryDoc()
    @ApiBearerAuth()
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    async create(
        @Body(new ValidationPipe()) data: CreateGalleryDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        // for avatar
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        try {
            if (file) {
                const avatarBuffer = file.buffer;

                // resize images to 600, 900, 1200
                const sizes = [{ key: 'lg', size: 1200 }];
                await Promise.all(
                    sizes.map(async (s) => {
                        const { key, size } = s;
                        const filename = `${uniqueSuffix}_${key}.${ext}`;
                        const filepath = path.join(
                            './public/photos/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            avatarBuffer,
                            filepath,
                        );
                    }),
                );
                data.photo = `/public/photos/${uniqueSuffix}_lg.${ext}`;
            }

            return this.galleriesService.create(
                data as Prisma.GalleryCreateInput,
            );
        } catch (error) {
            //jika terjadi error, hapus photo yang tersimpan
            if (file) {
                //hapus photo jika ada file
                this.appService.removeFile(
                    `/public/photos/${uniqueSuffix}_lg.${ext}`,
                );
            }

            throw error;
        }
    }

    //public karena galleries ditampilkan di landing page
    @GetAllGalleriesDoc()
    @Public()
    @Get()
    findAll() {
        return this.galleriesService.findAll();
    }

    @GetGalleryByIdDoc()
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.galleriesService.findOne(id);
    }

    @UpdateGalleryDoc()
    @ApiBearerAuth()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('photo'))
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: UpdateGalleryDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        // for photo
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        try {
            if (file) {
                const avatarBuffer = file.buffer;

                // resize images to 600, 900, 1200
                const sizes = [{ key: 'lg', size: 1200 }];
                await Promise.all(
                    sizes.map(async (s) => {
                        const { key, size } = s;
                        const filename = `${uniqueSuffix}_${key}.${ext}`;
                        const filepath = path.join(
                            './public/photos/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            avatarBuffer,
                            filepath,
                        );
                    }),
                );

                data.photo = `/public/photos/${uniqueSuffix}_lg.${ext}`;
            }

            return this.galleriesService.update(id, data);
        } catch (error) {
            //jika terjadi error, hapus photo yang tersimpan
            if (file) {
                //hapus photo jika ada file
                this.appService.removeFile(
                    `/public/photos/${uniqueSuffix}_lg.${ext}`,
                );
            }

            throw error;
        }
    }

    @RemoveGalleryDoc()
    @ApiBearerAuth()
    @Roles(Role.Superadmin, Role.Admin)
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.galleriesService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
