import { IsBoolean, IsEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class CreateNonPhysicalCharacterDto {
    @IsString()
    motto: string

    @IsString()
    life_goal: string

    @IsString()
    hobby: string

    @IsString()
    spare_time_activity: string

    @IsString()
    positive_traits: string

    @IsString()
    negative_traits: string

    @IsString()
    liked_things: string

    @IsString()
    unliked_things: string

    @IsBoolean()
    drink_alcohol: boolean

    @IsBoolean()
    smoking: boolean

}
