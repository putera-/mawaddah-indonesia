import {
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @IsStrongPassword()
    @Length(6, 100)
    password: string;

    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
