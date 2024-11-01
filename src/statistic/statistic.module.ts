import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [StatisticController],
    providers: [StatisticService, UsersService, PrismaService, AppService],
})
export class StatisticModule {}
