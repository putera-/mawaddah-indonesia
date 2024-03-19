import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.metadata';
import { promises as fs } from 'fs';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

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
}
