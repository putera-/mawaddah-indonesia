import { ExperienceType } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString, } from "class-validator";

export class CreateExperienceDto {
    @IsEnum(ExperienceType)
    type: ExperienceType

    @IsNumber()
    start_year: number

    @IsNumber()
    end_year: number

    @IsString()
    position: string

    @IsString()
    description: string

}
