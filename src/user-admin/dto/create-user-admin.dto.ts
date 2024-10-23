import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { GlobalUserDto } from 'src/users/dto/global-user.dto';

export class CreateUserAdminDto extends IntersectionType(GlobalUserDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    role: 'ADMIN';
}
