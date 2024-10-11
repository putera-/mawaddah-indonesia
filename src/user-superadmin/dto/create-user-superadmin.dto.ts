import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { GlobalUserDto } from 'src/users/dto/global-user.dto';

export class CreateUserSuperadminDto extends IntersectionType(GlobalUserDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    role: 'SUPERADMIN';
}
