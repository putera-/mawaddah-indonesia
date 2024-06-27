import { IsString } from "class-validator";

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

    @IsString()
    short_term_achievement: string

    @IsString()
    long_term_achievement: string

    @IsString()
    wife_work_permit: boolean

    @IsString()
    wife_work_permit_desc: string

}
