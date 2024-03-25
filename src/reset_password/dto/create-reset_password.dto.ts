import { IsEmail, IsString } from "class-validator";

export class CreateResetPasswordDto {
    @IsEmail()
    @IsString()
    email: string
}
