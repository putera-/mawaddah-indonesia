import { Module } from '@nestjs/common';
import { FamilyMembersService } from './family_members.service';
import { FamilyMembersController } from './family_members.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FamilyMembersController],
  providers: [FamilyMembersService, PrismaService],
})
export class FamilyMembersModule {}
