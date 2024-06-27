import { MarriageStatus } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateNonPhysicalCriteriaDto {
    @IsNumber()
    age: number;

    @IsString()
    domicile: string;

    @IsString()
    education: string;

    @IsString()
    married_status: MarriageStatus;

    @IsString()
    sport: string;

    @IsString()
    hobby: string;

    @IsString()
    traits: string;

    @IsString()
    ethnic: string;

    @IsString()
    job: string;

    @IsString()
    other: string;
}
