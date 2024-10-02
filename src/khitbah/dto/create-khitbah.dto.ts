import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator"

export class CreateKhitbahDto {
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    schedule: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    message?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    reply?: string
}
