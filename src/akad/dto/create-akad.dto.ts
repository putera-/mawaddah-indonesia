import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAkadDto {
    @ApiProperty()
    @IsString()
    schedule: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    message?: string;
}
