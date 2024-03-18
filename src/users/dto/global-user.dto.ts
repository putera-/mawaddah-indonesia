import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class GlobalUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 100)
    firstname: string;

    @IsString()
    @Length(1, 100)
    lastname: string;

    @IsString()
    @IsStrongPassword()
    @Length(6, 100)
    password: string;

    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
