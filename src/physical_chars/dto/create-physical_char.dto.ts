import { body_shape, eye_Color, hair_color, hair_type, skin_color } from "@prisma/client";
import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePhysicalCharDto {
    @IsInt()
    @IsOptional()
    height: number

    @IsInt()
    @IsOptional()
    weight: number

    @IsString()
    @IsOptional()
    @MinLength(1)
    body_shape: body_shape

    @IsString()
    @IsOptional()
    @MinLength(1)
    skin_color: skin_color

    @IsString()
    @IsOptional()
    @MinLength(1)
    hair_color: hair_color

    @IsString()
    @IsOptional()
    @MinLength(1)
    hair_type: hair_type

    @IsString()
    @IsOptional()
    @MinLength(1)
    eye_color: eye_Color

    @IsBoolean()
    characteristic: boolean

    @IsString()
    @MinLength(1)
    characteristic_detail: string

    @IsBoolean()
    medical_history: boolean

    @IsString()
    @MinLength(1)
    medical_history_detail: string

}
