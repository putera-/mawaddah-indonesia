import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator"

export class CreateNadharDto {
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
