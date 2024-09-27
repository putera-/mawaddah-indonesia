import { ApiProperty } from '@nestjs/swagger';
import { relationship, religion } from '@prisma/client';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class CreateFamilyMemberDto {
    @ApiProperty()
    @IsEnum(relationship)
    relationship: relationship;

    @ApiProperty()
    @IsEnum(religion)
    religion: religion;

    @ApiProperty()
    @IsString()
    dob: string;

    @ApiProperty()
    @IsString()
    education: string;

    @ApiProperty()
    @IsString()
    job: string;

    @ApiProperty()
    @IsBoolean()
    is_alive: boolean;
}
