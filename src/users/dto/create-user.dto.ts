import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { GlobalUserDto } from './global-user.dto';
import { RoleStatus } from '@prisma/client';

export class CreateUserDto extends IntersectionType(GlobalUserDto) {
    @IsString()
    @IsOptional()
    role: RoleStatus;
}
