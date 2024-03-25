import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { AppService } from 'src/app.service';
import { BiodataService } from 'src/biodata/biodata.service';

@Module({
    controllers: [CandidateController],
    providers: [
        CandidateService,
        PrismaService,
        UsersService,
        AppService,
        BiodataService,
    ],
})
export class CandidateModule {}
