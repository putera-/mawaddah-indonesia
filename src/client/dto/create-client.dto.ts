import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MinLength } from 'class-validator';

export class CreateClientDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
    name: string;

    @ApiProperty()
    @IsString()
    @Length(1, 20)
    phone: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    address: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    about: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    taaruf_muqoddimah: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    login_muqoddimah: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    signup_muqoddimah: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    youtube: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    facebook: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    twitter: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    tiktok: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    instagram: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    linkedin: string;
}
