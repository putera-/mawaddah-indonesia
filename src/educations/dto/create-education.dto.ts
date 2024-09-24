import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateEducationDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    institution_name: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    major: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    degree: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string

    @ApiProperty()
    @IsNumber()
    startYear: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    endYear: number
}
