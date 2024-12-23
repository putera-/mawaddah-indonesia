import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Redirect,
    Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.metadata';
import { promises as fs } from 'fs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    getAvatarDoc,
    getDummyPhotoDoc,
    getGalleryDoc,
    getPhotoDoc,
} from './app.doc';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Public()
    @Get()
    @Redirect('/api', 301)
    redirectToApiSwagger() { }

    @Public()
    @getPhotoDoc()
    @Get('photo/:file_name')
    async getPhoto(@Param('file_name') file: string, @Res() res) {
        try {
            await fs.access(`./public/photos/${file}`);
            res.sendFile(file, { root: './public/photos' });
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @getGalleryDoc()
    @Get('gallery/:file_name')
    async getGallery(@Param('file_name') file: string, @Res() res) {
        try {
            await fs.access(`./public/galleries/${file}`);
            res.sendFile(file, { root: './public/galleries' });
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @getAvatarDoc()
    @Get('avatar/:file_name')
    async getAvatar(@Param('file_name') file: string, @Res() res) {
        try {
            await fs.access(`./public/avatar/${file}`);
            res.sendFile(file, { root: './public/avatar' });
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @Get('blog_image/:file_name')
    async getBlogImage(@Param('file_name') file: string, @Res() res) {
        try {
            await fs.access(`./public/blogs/${file}`);
            res.sendFile(file, { root: './public/blogs' });
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @Get('slides/:file_name')
    async getSlideImage(@Param('file_name') file: string, @Res() res) {
        try {
            await fs.access(`./public/slides/${file}`);
            res.sendFile(file, { root: './public/slides' });
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @getDummyPhotoDoc()
    @Get('dummy/:file_name')
    async getDummyPhoto(@Param('file_name') file: string, @Res() res) {
        console.log({ file });
        try {
            await fs.access(`./public/dummy/${file}`);
            res.sendFile(file, { root: './public/dummy' });
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }
}
