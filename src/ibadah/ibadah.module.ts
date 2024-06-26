import { Module } from '@nestjs/common';
import { IbadahService } from './ibadah.service';
import { IbadahController } from './ibadah.controller';
import { PrismaService } from 'src/prisma.service';
import { BiodataModule } from 'src/biodata/biodata.module';
import { BiodataService } from 'src/biodata/biodata.service';

@Module({
    controllers: [IbadahController],
    providers: [IbadahService, PrismaService, BiodataModule, BiodataService],
})
export class IbadahModule {}
