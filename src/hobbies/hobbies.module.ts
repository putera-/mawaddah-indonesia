import { Module } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { HobbiesController } from './hobbies.controller';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HobbiesController],
  providers: [HobbiesService,UsersService, AppService, PrismaService],
})
export class HobbiesModule {}
