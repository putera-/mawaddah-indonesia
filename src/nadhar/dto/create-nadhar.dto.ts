import { IsDate, IsOptional, IsString } from "class-validator"

export class CreateNadharDto {
    @IsDate()
    schedule: Date

    @IsOptional()
    @IsString()
    message?: string

    @IsOptional()
    @IsString()
    reply?: string

}
