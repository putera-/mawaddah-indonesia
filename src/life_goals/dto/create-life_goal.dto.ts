import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateLifeGoalDto {
    @ApiProperty()
    @IsString()
    career: string

    @ApiProperty()
    @IsString()
    domicile: string

    @ApiProperty()
    @IsString()
    child_count: string

    @ApiProperty()
    @IsString()
    child_education: string

    @ApiProperty()
    @IsString()
    financial_arrangement: string

    @ApiProperty()
    @IsString()
    knowledge_upgrade: string

    @ApiProperty()
    @IsString()
    short_term_achievement: string

    @ApiProperty()
    @IsString()
    long_term_achievement: string

    @ApiProperty()
    @IsBoolean()
    wife_work_permit: boolean

    @ApiProperty()
    @IsString()
    wife_work_permit_desc: string

}
