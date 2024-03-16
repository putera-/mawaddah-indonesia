import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    ValidationPipe,
    Request,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { User } from './user.interface';
import { Public } from 'src/auth/auth.metadata';
import { PasswordUserDto } from './dto/password-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { PhotosService } from 'src/photos/photos.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private photoService: PhotosService,
    ) {}
    @Public()
    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserDto) {
        try {
            await this.userService.validateNewUser(data);

            const user: User = await this.userService.create(data);

            // FORMAT/HIDE USER DATA
            this.userService.formatGray(user);

            return user;
        } catch (error) {
            throw error;
        }
    }

    @Get()
    async findAll() {
        try {
            return this.userService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.userService.findOne(id);
        } catch (error) {
            throw error;
        }
    }
    @Patch('change_password')
    @HttpCode(204)
    async updatePassword(@Request() req: any, @Body() data: PasswordUserDto) {
        try {
            const user = await this.userService.findOne(req.id);
            this.userService.checkPassword(data);
            await this.userService.updatePassword(user.id, data.password);
        } catch (error) {
            throw error;
        }
    }
    @Patch()
    @UseInterceptors(FileInterceptor('avatar'))
    async updateUser(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        // for avatar
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        // only can update belongs to auth user
        const { id } = req.user;
        // prevent change email
        if (data.email) delete data.email;
        try {
            if (file) {
                const avatarBuffer = file.buffer;

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
                            './uploads/photos/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            avatarBuffer,
                            filepath,
                        );
                    }),
                );

                data.avatar = `/uploads/photos/${uniqueSuffix}_lg.${ext}`;
                data.avatar_md = `/uploads/photos/${uniqueSuffix}_md.${ext}`;
            } else {
                data.avatar = '';
                data.avatar_md = '';
            }

            return this.userService.update(id, data);
        } catch (error) {
            // remove avatar
            if (file) {
                this.photoService.removeFile(
                    `/uploads/photos/${uniqueSuffix}_lg.${ext}`,
                );
                this.photoService.removeFile(
                    `/uploads/photos/${uniqueSuffix}_md.${ext}`,
                );
            }

            throw error;
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        try {
            return this.userService.update(id, data as Prisma.UserUpdateInput);
        } catch (error) {
            throw error;
        }
    }

    @Patch('activate/:id')
    @HttpCode(204)
    async activateUser(@Param('id') id: string): Promise<void> {
        try {
            await this.userService.activateUser(id);
        } catch (error) {
            throw error;
        }
    }
    @Patch('deactivate/:id')
    @HttpCode(204)
    async deactivateUser(@Param('id') id: string): Promise<void> {
        try {
            await this.userService.deactivateUser(id);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.userService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
