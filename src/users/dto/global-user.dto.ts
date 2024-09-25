import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class GlobalUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    firstname: string;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    lastname: string;

    @ApiProperty()
    @IsString()
    @IsStrongPassword()
    @Length(6, 100)
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
