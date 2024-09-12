import { Controller, Get, NotFoundException, Param, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.metadata';
import { promises as fs } from 'fs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Redirect('/api', 301)
    @ApiOperation({ summary: 'Redirect to API documentation' })
    @ApiResponse({ status: 301, description: 'Redirect to Swagger UI' })
    redirectToApiSwagger() { }

    @Public()
    @Get('photo/:file')
    async getPhoto(@Param('file') file: string, @Res() res) {
        try {
            await fs.access(`./public/photos/${file}`);
            res.sendFile(file, { root: './public/photos' })
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @Get('gallery/:file')
    async getGallery(@Param('file') file: string, @Res() res) {
        try {
            await fs.access(`./public/galleries/${file}`);
            res.sendFile(file, { root: './public/galleries' })
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @Get('avatar/:file')
    async getAvatar(@Param('file') file: string, @Res() res) {
        try {
            await fs.access(`./public/avatar/${file}`);
            res.sendFile(file, { root: './public/avatar' })
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }

    @Public()
    @Get('dummy/:file')
    async getDummyPhoto(@Param('file') file: string, @Res() res) {
        try {
            await fs.access(`./public/dummy/${file}`);
            res.sendFile(file, { root: './public/dummy' })
        } catch (error) {
            throw new NotFoundException('File not found');
        }
    }
}
