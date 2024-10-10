import { ApiProperty } from '@nestjs/swagger';
import { MarriageStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateNonPhysicalCriteriaDto {
    @ApiProperty()
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsString()
    domicile: string;

    @ApiProperty()
    @IsString()
    education: string;

    @ApiProperty()
    @IsEnum(MarriageStatus)
    married_status: MarriageStatus;

    @ApiProperty()
    @IsString()
    sport: string;

    @ApiProperty()
    @IsString()
    hobby: string;

    @ApiProperty()
    @IsString()
    traits: string;

    @ApiProperty()
    @IsString()
    ethnic: string;

    @ApiProperty()
    @IsString()
    job: string;

    @ApiProperty()
    @IsString()
    other: string;
}
