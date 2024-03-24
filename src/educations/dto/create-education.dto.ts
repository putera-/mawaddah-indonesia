import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateEducationDto {
    
    @IsString()
    @MinLength(1)
    institution_name: string
    
    @IsString()
    @IsOptional()
    major: string
    
    @IsString()
    @IsOptional()
    degree: string
    
    @IsString()
    @IsOptional()
    city: string
    
    @IsString()
    @IsNumber()
    startYear: number
    
    @IsNumber()
    @IsOptional()
    endYear: number
}
