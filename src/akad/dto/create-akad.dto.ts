import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator"

export class CreateAkadDto {

    @IsDate()
    @Type(() => Date)
    schedule: Date;

    @IsOptional()
    @IsString()
    message?: string

    @IsOptional()
    @IsString()
    reply?: string
}
