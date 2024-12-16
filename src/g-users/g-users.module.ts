import { Module } from '@nestjs/common';
import { GUsersService } from './g-users.service';
import { GUsersResolver } from './g-users.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [GUsersResolver, GUsersService, PrismaService],
})
export class GUsersModule { }
