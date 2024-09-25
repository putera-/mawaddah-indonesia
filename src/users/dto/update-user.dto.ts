import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar_md: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    blurred_avatar: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    blurred_avatar_md: string;
}
