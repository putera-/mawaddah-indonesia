import { relationship, religion } from "@prisma/client"
import { IsBoolean, IsEnum, IsString } from "class-validator"

export class CreateFamilyMemberDto {
    @IsEnum(relationship)
    relationship: relationship

    @IsEnum(religion)
    religion: religion

    @IsString()
    dob: string

    @IsString()
    education: string

    @IsString()
    job: string

    @IsBoolean()
    is_alive: boolean
}
