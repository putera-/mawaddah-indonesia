import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, Length } from "class-validator"

export class CreateSliderDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
    title: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    photo: string
}
