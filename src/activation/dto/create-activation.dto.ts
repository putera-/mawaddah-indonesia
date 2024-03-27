import { IsDate, IsEmail, IsString, Length } from 'class-validator';

export class CreateActivationDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 200)
    activation_key: string;

    @IsDate()
    expiredAt: Date;
}
