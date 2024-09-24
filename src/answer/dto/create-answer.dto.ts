import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAnswerDto {
    @ApiProperty()
    @IsString()
    answer: string;
}
