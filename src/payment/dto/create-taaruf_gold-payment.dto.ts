import { IsNumber, Min } from "class-validator";

export class CreateTaarufGoldPaymentDto {
    @IsNumber()
    @Min(1000)
    gross_amount: number

}
