import { body_shape, eye_Color, hair_color, hair_type, skin_color } from "@prisma/client";
import { IsString, MinLength } from "class-validator";

export class CreatePhysicalCharDto {
    @IsString()
    @MinLength(1)
    body_shape: body_shape

    @IsString()
    @MinLength(1)
    skin_color: skin_color

    @IsString()
    @MinLength(1)
    hair_color: hair_color

    @IsString()
    @MinLength(1)
    hair_type: hair_type

    @IsString()
    @MinLength(1)
    eye_color: eye_Color

    @IsString()
    @MinLength(1)
    characteristic: string

    @IsString()
    @MinLength(1)
    characteristic_detail: string

    @IsString()
    @MinLength(1)
    medical_history: string

    @IsString()
    @MinLength(1)
    medical_history_detail: string

}
