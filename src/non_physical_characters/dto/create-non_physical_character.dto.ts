import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString, MinLength } from "class-validator"

export class CreateNonPhysicalCharacterDto {
    @ApiProperty()
    @IsString()
    motto: string

    @ApiProperty()
    @IsString()
    life_goal: string

    @ApiProperty()
    @IsString()
    hobby: string

    @ApiProperty()
    @IsString()
    spare_time_activity: string

    @ApiProperty()
    @IsString()
    positive_traits: string

    @ApiProperty()
    @IsString()
    negative_traits: string

    @ApiProperty()
    @IsString()
    liked_things: string

    @ApiProperty()
    @IsString()
    unliked_things: string

    @ApiProperty()
    @IsBoolean()
    drink_alcohol: boolean

    @ApiProperty()
    @IsBoolean()
    smoking: boolean

}
