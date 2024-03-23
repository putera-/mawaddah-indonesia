import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Req,
    Request,
    UploadedFile,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './auth.metadata';
import { UsersService } from 'src/users/user.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import path from 'path';
import { PhotosService } from 'src/photos/photos.service';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        private photoService: PhotosService,
    ) {}
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
        try {
            return this.authService.signIn(signInDto.email, signInDto.password);
        } catch (error) {
            throw error;
        }
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async create(@Body(new ValidationPipe()) data: CreateUserDto) {
        try {
            await this.userService.validateNewUser(data);

            const user: User = await this.userService.create(data);

            // FORMAT/HIDE USER DATA
            // this.userService.formatGray(user);

            return user;
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Member, Role.Superadmin, Role.Admin)
    @Get('profile')
    async getProfile(@Request() req) {
        try {
            const user = req.user;
            return await this.userService.findOne(user.id, user.role);
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Patch('profile')
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
                            './public/avatar/' + filename,
                        );

                        await this.photoService.resize(
                            size,
                            avatarBuffer,
                            filepath,
                        );
                    }),
                );

                data.avatar = `/avatar/${uniqueSuffix}_lg.${ext}`;
                data.avatar_md = `/avatar/${uniqueSuffix}_md.${ext}`;
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
    @Get('extend-access-token')
    async extendAccessToken(@Req() req) {
        const user = req.user;
        const { access_token, exp } = await this.authService.createToken(
            user.id,
            user.username,
            user.role,
        );

        // black list old token
        const token = req.headers.authorization.split(' ')[1];
        this.authService.addBlackListToken(token);

        return { access_token, exp };
    }

    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Patch('change_password')
    @HttpCode(204)
    async updatePassword(@Request() req: any, @Body() data: ChangePasswordDto) {
        try {
            const role = req.user.role;
            const id = req.user.id;
            const user = await this.userService.findOne(id, role);
            this.userService.checkPassword(data);
            await this.userService.updatePassword(user.id, data.password);
        } catch (error) {
            throw error;
        }
    }
    @Delete('logout')
    @HttpCode(204)
    logOut(@Req() req) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            this.authService.addBlackListToken(token);
        } catch (error) {
            throw error;
        }
    }
}
