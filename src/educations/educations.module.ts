import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [EducationsController],
  providers: [EducationsService, PrismaService, UsersService, AppService],
})
export class EducationsModule {}