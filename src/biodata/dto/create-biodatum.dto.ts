import { ApiProperty } from '@nestjs/swagger';
import {
    Gender,
    ManhajStatus,
    MarriagePermission,
    MarriageStatus,
} from '@prisma/client';
import {
    IsEnum,
    IsISO8601,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
} from 'class-validator';

export class CreateBiodatumDto {
    @ApiProperty()
    @IsString()
    bio: string;

    @IsPhoneNumber()
    @Length(1, 20)
    phone: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    company: string;

    @ApiProperty()
    @IsEnum(ManhajStatus)
    manhaj: ManhajStatus;

    @ApiProperty()
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty()
    @IsEnum(MarriageStatus)
    marriage_status: MarriageStatus;

    @ApiProperty()
    @IsEnum(MarriagePermission)
    marriage_permission: MarriagePermission;

    @ApiProperty()
    @IsString()
    dob: String;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    birth_place: string;

    @ApiProperty()
    @IsNumber()
    birth_order: number;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    address: string;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    address_town: string;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    address_province: string;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    hometown_province: string;

    @ApiProperty()
    @IsNumber()
    address_zip_code: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    poligami_opinion: string;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    ethnic: string;
}
