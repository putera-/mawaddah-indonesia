import { Module } from '@nestjs/common';
import { MarriedGoalsService } from './married_goals.service';
import { MarriedGoalsController } from './married_goals.controller';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MarriedGoalsController],
  providers: [MarriedGoalsService, UsersService, AppService, PrismaService],
})
export class MarriedGoalsModule { }
