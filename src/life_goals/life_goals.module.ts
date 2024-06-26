import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';
import { life_goalService } from './life_goals.service';
import { LifeGoalsController } from './life_goals.controller';
import { BiodataService } from 'src/biodata/biodata.service';

@Module({
  controllers: [LifeGoalsController],
  providers: [life_goalService, UsersService, AppService, PrismaService, BiodataService],
})
export class LifeGoalsModule { }
