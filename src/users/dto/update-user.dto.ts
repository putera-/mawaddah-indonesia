import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    avatar: string;

    @IsString()
    @IsOptional()
    avatar_md: string;

    @IsString()
    @IsOptional()
    blurred_avatar: string;

    @IsString()
    @IsOptional()
    blurred_avatar_md: string;
}
