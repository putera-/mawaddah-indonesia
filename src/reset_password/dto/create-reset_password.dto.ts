import { IsString } from "class-validator";

export class CreateResetPasswordDto {
    @IsString()
    userEmail: string
}
