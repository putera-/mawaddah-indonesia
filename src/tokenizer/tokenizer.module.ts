import { Module } from '@nestjs/common';
import { TokenizerService } from './tokenizer.service';
import { TokenizerController } from './tokenizer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [TokenizerController],
    providers: [TokenizerService, PrismaService],
})
export class TokenizerModule { }
