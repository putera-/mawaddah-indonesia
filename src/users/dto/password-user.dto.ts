import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class PasswordUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsStrongPassword()
    @Length(6, 100)
    password: string;

    @IsString()
    @IsNotEmpty()
    password_confirm: string;
}
