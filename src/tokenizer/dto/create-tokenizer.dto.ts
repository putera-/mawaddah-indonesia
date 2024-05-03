import { IsNumber, Min } from "class-validator";

export class CreateTokenDto {
    @IsNumber()
    @Min(1000)
    gross_amount: number

}
