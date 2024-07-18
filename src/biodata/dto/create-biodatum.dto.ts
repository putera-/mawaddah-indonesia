import {
    Gender,
    ManhajStatus,
    MarriagePermission,
    MarriageStatus,
} from '@prisma/client';
import {
    IsISO8601,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
} from 'class-validator';

export class CreateBiodatumDto {
    @IsString()
    bio: string;

    @IsPhoneNumber()
    @Length(1, 20)
    phone: string;

    @IsString()
    @IsOptional()
    company: string;

    // FIXME enum
    @IsString()
    manhaj: ManhajStatus;

    // FIXME enum
    @IsString()
    gender: Gender;

    // FIXME enum
    @IsString()
    marriage_status: MarriageStatus;

    // FIXME enum
    @IsString()
    marriage_permission: MarriagePermission;

    @IsISO8601()
    dob: Date;

    @IsString()
    @Length(1, 100)
    birth_place: string;

    @IsNumber()
    birth_order: number;

    @IsString()
    @Length(1, 100)
    address: string;

    @IsString()
    @Length(1, 100)
    address_town: string;

    @IsString()
    @Length(1, 100)
    address_province: string;

    @IsString()
    @Length(1, 100)
    hometown_province: string;

    @IsNumber()
    address_zip_code: number;

    @IsString()
    @IsOptional()
    poligami_opinion: string;

    @IsString()
    @Length(1, 100)
    ethnic: string;
}
