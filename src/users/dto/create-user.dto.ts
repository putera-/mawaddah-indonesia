import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { GlobalUserDto } from './global-user.dto';
import { RoleStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends IntersectionType(GlobalUserDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    role: RoleStatus;
}
