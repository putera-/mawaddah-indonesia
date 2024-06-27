import { Module } from '@nestjs/common';
import { NonPhysicalCharactersService } from './non_physical_characters.service';
import { NonPhysicalCharactersController } from './non_physical_characters.controller';
import { PrismaService } from 'src/prisma.service';
import { BiodataService } from 'src/biodata/biodata.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';

@Module({
    controllers: [NonPhysicalCharactersController],
    providers: [NonPhysicalCharactersService, PrismaService, BiodataService, UsersService, AppService],
})
export class NonPhysicalCharactersModule { }
