import { Module } from '@nestjs/common';
import { MarriagePreparationService } from './marriage_preparation.service';
import { MarriagePreparationController } from './marriage_preparation.controller';
import { PrismaService } from 'src/prisma.service';
import { BiodataService } from 'src/biodata/biodata.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [MarriagePreparationController],
  providers: [MarriagePreparationService, PrismaService, BiodataService, UsersService, AppService],
})
export class MarriagePreparationModule {}
