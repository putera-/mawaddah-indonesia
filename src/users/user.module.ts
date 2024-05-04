import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { PhotosModule } from 'src/photos/photos.module';
import { PhotosService } from 'src/photos/photos.service';
import { UsersController } from './user.controller';
import { ActivationService } from 'src/activation/activation.service';
import { EmailService } from 'src/email.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, AppService, PhotosService, ActivationService, EmailService],
    exports: [UsersService],
    imports: [PhotosModule],
})
export class UsersModule {}
