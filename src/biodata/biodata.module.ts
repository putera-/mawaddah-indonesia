import { Module } from '@nestjs/common';
import { BiodataService } from './biodata.service';
import { BiodataController } from './biodata.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [BiodataController],
    providers: [BiodataService, PrismaService, UsersService, AppService],
})
export class BiodataModule {}
