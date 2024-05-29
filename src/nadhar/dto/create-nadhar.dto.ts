import { IsDate, IsOptional, IsString } from "class-validator"

export class CreateNadharDto {
    @IsOptional()
    @IsDate()
    schedule?: Date

    @IsString()
    message: string

    @IsOptional()
    @IsString()
    reply?: string

}
