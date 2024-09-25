import { ApiProperty } from "@nestjs/swagger";
import { ExperienceType } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString, } from "class-validator";

export class CreateExperienceDto {
    @ApiProperty()
    @IsEnum(ExperienceType)
    type: ExperienceType

    @ApiProperty()
    @IsNumber()
    start_year: number

    @ApiProperty()
    @IsNumber()
    end_year: number

    @ApiProperty()
    @IsString()
    position: string

    @ApiProperty()
    @IsString()
    description: string

}
