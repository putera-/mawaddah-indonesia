import {
    IsISO8601,
    IsNumber,
    IsPhoneNumber,
    IsString,
    Length,
} from 'class-validator';

export enum Manhaj {
    SALAF = 'SALAF',
    BARU_BELAJAR = 'BARU_BELAJAR',
    NON_SALAF = 'NON_SALAF',
}
export enum Gender {
    PRIA = 'PRIA',
    WANITA = 'WANITA',
}

export enum MarriageStatus {
    LAJANG = 'LAJANG',
    MENIKAH = 'MENIKAH',
    DUDA = 'DUDA',
    JANDA = 'JANDA',
}

export enum MarriagePermission {
    POLIGAMI = 'POLIGAMI',
    NON_POLIGAMI = 'NON_POLIGAMI',
}

export class CreateBiodatumDto {
    @IsString()
    bio: string;

    @IsPhoneNumber()
    @Length(1, 20)
    phone: string;

    @IsString()
    manhaj: Manhaj;

    @IsString()
    gender: Gender;

    @IsString()
    marriage_status: MarriageStatus;

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
    domicile_town: string;

    @IsString()
    @Length(1, 100)
    domicile_province: string;

    @IsString()
    @Length(1, 100)
    hometown_province: string;

    @IsString()
    @Length(1, 100)
    ethnic: string;
}
