import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';
import { ResetPasswordController } from './reset_password.controller';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { ActivationService } from 'src/activation/activation.service';
import { EmailService } from 'src/email.service';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService, UsersService, AppService, AuthService, EmailService, ActivationService, PrismaService],
})
export class ResetPasswordModule { }
