import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService, UsersService, AppService, PrismaService ],
})
export class SkillsModule {}
