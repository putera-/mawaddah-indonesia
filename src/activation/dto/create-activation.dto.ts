import { IsDate, IsEmail, IsString, Length } from 'class-validator';

export class CreateActivationDto {
    @IsEmail()
    email: string;

    @IsDate()
    expiredAt: Date;
}
