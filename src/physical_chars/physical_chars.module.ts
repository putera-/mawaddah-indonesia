import { Module } from '@nestjs/common';
import { PhysicalCharsService } from './physical_chars.service';
import { PhysicalCharsController } from './physical_chars.controller';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PhysicalCharsController],
  providers: [PhysicalCharsService, UsersService, AppService, PrismaService],
})
export class PhysicalCharsModule {}
