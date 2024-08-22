import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { BiodataService } from 'src/biodata/biodata.service';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService, PrismaService, AppService, BiodataService],
})
export class ExperiencesModule {}
