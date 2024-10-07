import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator"

export class CreateNadharDto {
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    schedule: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    message?: string
}
