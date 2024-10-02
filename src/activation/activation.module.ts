import { Module } from '@nestjs/common';
import { ActivationService } from './activation.service';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [ActivationService, PrismaService, EmailService, ConfigService],
    exports: [ActivationService],
})
export class ActivationModule {}
