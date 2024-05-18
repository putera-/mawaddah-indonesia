import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Request,
    Res,
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
import { ActivationService } from 'src/activation/activation.service';
import { Response } from 'express';
import { sendResetPassword } from './dto/send-reset-password.dto';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        private photoService: PhotosService,
        private activation: ActivationService,
    ) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async create(
        @Body(new ValidationPipe()) data: CreateUserDto,
        @Res() res: Response,
    ) {
        try {
            // validasi apakah user sudah terdaftar atau belum
            await this.userService.validateNewUser(data);
            // buat user
            const user: User = await this.userService.create(data);
            // kirim kode aktivasi ke email
            await this.authService.sendActivation(user.email);

            res.status(HttpStatus.OK).json({
                message: 'Silahkan periksa email untuk verifikasi akun.',
            });
        } catch (error) {
            throw error;
        }
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Patch('activate')
    async activateUser(@Query('token') id: string): Promise<void> {
        try {
            await this.userService.activateUser(id);
        } catch (error) {
            throw error;
        }
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('send-activation')
    async sendActivation(@Query('email') email: string): Promise<void> {
        try {
            await this.authService.sendActivation(email);
        } catch (error) {
            throw error;
        }
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('reset-password')
    async resetPassword(
        @Param('token') id: string,
        @Body(new ValidationPipe()) data: any,
    ): Promise<void> {
        try {
            await this.authService.resetPassword(id, data);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('send-reset-password')
    async sendResetPassword(
        @Body(new ValidationPipe()) data: sendResetPassword,
    ): Promise<void> {
        try {
            await this.authService.sendResetPassword(data.email);
        } catch (error) {
            throw error;
        }
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<User> {
        try {
            return this.authService.signIn(signInDto.email, signInDto.password);
        } catch (error) {
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
        const blurUniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9 * 2);

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
                        const blurredFilename = `${blurUniqueSuffix}_${key}.${ext}`;
                        const filepath = path.join(
                            './public/avatar/' + filename,
                        );
                        const blurredFilepath = path.join(
                            './public/avatar/' + blurredFilename,
                        );

                        await this.photoService.resize(
                            size,
                            avatarBuffer,
                            filepath,
                        );
                        await this.photoService.blurringImage(
                            size,
                            avatarBuffer,
                            blurredFilepath,
                        );
                    }),
                );

                data.avatar = `/avatar/${uniqueSuffix}_lg.${ext}`;
                data.avatar_md = `/avatar/${uniqueSuffix}_md.${ext}`;
                data.blurred_avatar = `/avatar/${blurUniqueSuffix}_lg.${ext}`;
                data.blurred_avatar_md = `/avatar/${blurUniqueSuffix}_md.${ext}`;
            }

            return this.userService.update(id, data);
        } catch (error) {
            // remove avatar
            if (file) {
                this.photoService.removeFile(
                    `/public/avatar/${uniqueSuffix}_lg.${ext}`,
                );
                this.photoService.removeFile(
                    `/public/avatar/${uniqueSuffix}_md.${ext}`,
                );
            }
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Patch('change_password')
    @HttpCode(204)
    async updatePassword(
        @Request() req: any,
        @Body(new ValidationPipe()) data: ChangePasswordDto,
    ) {
        try {
            return await this.userService.updatePassword(req.user.id, data);
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
