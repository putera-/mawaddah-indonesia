import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateProvinceDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
    name: string;
}
