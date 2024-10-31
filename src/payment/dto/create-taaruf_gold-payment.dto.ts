import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateTaarufGoldPaymentDto {
    @ApiProperty()
    @IsNumber()
    @Min(1000)
    gross_amount: number;
}
