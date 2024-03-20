import { Module } from '@nestjs/common';
import { LifeGoalsService } from './life_goals.service';
import { LifeGoalsController } from './life_goals.controller';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LifeGoalsController],
  providers: [LifeGoalsService, UsersService, AppService, PrismaService],
})
export class LifeGoalsModule {}
