import { IsEmail, IsNotEmpty } from 'class-validator';

export class sendResetPassword {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
