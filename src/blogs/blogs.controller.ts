import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { Public } from 'src/auth/auth.metadata';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import path from 'path';
import { Prisma } from '@prisma/client';

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService,
        private photoService: PhotosService,
    ) { }

    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() createBlogDto: CreateBlogDto, @UploadedFile() file: Express.Multer.File) {
        // for image
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        try {
            const data: Prisma.BlogCreateInput = {
                ...createBlogDto,
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
                            './public/blogs/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            fileBuffer,
                            filepath,
                        );
                    }),
                );

                data.image = `/blogs/${uniqueSuffix}_lg.${ext}`;
                data.image_md = `/blogs/${uniqueSuffix}_md.${ext}`;
            }
            return this.blogsService.create(data);
        } catch (error) {
            // remove image
            if (file) {
                this.photoService.removeFile(
                    `/public/blogs/${uniqueSuffix}_lg.${ext}`,
                );
                this.photoService.removeFile(
                    `/public/blogs/${uniqueSuffix}_md.${ext}`,
                );
            }

            throw error;
        }
    }

    @Public()
    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number) {
        try {
            return this.blogsService.findAll(page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.blogsService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @UploadedFile() file: Express.Multer.File) {
        // for image
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        try {
            const data: Prisma.BlogUpdateInput = {
                ...updateBlogDto,
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
                            './public/blogs/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            fileBuffer,
                            filepath,
                        );
                    }),
                );

                data.image = `/blogs/${uniqueSuffix}_lg.${ext}`;
                data.image_md = `/blogs/${uniqueSuffix}_md.${ext}`;
            }

            // TODO remove foto lama

            return this.blogsService.update(id, data);
        } catch (error) {
            // remove image
            if (file) {
                this.photoService.removeFile(
                    `/public/blogs/${uniqueSuffix}_lg.${ext}`,
                );
                this.photoService.removeFile(
                    `/public/blogs/${uniqueSuffix}_md.${ext}`,
                );
            }

            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin)
    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            return this.blogsService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
