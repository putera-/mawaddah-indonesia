import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class sendResetPassword {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
