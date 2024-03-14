import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 100)
    firstname: string;

    @IsString()
    @Length(1, 100)
    lastname: string;

    @IsString()
    @Length(1, 100)
    password: string;

    @IsString()
    @Length(1, 100)
    password_confirm: string;
}
