import { Module } from '@nestjs/common';
import { ActivationService } from './activation.service';
import { ActivationController } from './activation.controller';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [ActivationController],
    providers: [ActivationService, PrismaService, EmailService, ConfigService],
    exports: [ActivationService],
})
export class ActivationModule {}
