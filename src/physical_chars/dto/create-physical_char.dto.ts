import { ApiProperty } from "@nestjs/swagger";
import { body_shape, eye_Color, hair_color, hair_type, skin_color } from "@prisma/client";
import { IsBoolean, IsEnum, IsInt, IsString } from "class-validator";

export class CreatePhysicalCharDto {
    @ApiProperty()
    @IsInt()
    height: number

    @ApiProperty()
    @IsInt()
    weight: number

    @ApiProperty()
    @IsEnum(body_shape)
    body_shape: body_shape

    @ApiProperty()
    @IsEnum(skin_color)
    skin_color: skin_color

    @ApiProperty()
    @IsEnum(hair_color)
    hair_color: hair_color

    @ApiProperty()
    @IsEnum(hair_type)
    hair_type: hair_type

    @ApiProperty()
    @IsEnum(eye_Color)
    eye_color: eye_Color

    @ApiProperty()
    @IsBoolean()
    characteristic: boolean

    @ApiProperty()
    @IsString()
    characteristic_detail: string

    @ApiProperty()
    @IsBoolean()
    medical_history: boolean

    @ApiProperty()
    @IsString()
    medical_history_detail: string

}
