import { IsString, MinLength } from "class-validator";

export class CreateLifeGoalDto {
    @IsString()
    career: string

    @IsString()
    domicile: string

    @IsString()
    child_count: string

    @IsString()
    child_education: string

    @IsString()
    financial_arrangement: string

    @IsString()
    knowledge_upgrade: string

}
