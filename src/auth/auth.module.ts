import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/user.module';
import { AppService } from 'src/app.service';
import { PhotosService } from 'src/photos/photos.service';
import { ActivationService } from 'src/activation/activation.service';
import { EmailService } from 'src/email.service';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordService } from 'src/reset_password/reset_password.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UsersService,
        PrismaService,
        AppService,
        PhotosService,
        ActivationService,
        EmailService,
        ConfigService,
        ResetPasswordService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
