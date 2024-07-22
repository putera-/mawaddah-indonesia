import {
    body_shape,
    eye_Color,
    hair_color,
    hair_type,
    skin_color,
} from '@prisma/client';
import { IsEnum, IsInt } from 'class-validator';

export class CreatePhysicalCriteriaDto {
    @IsInt()
    height: number;

    @IsInt()
    weight: number;

    @IsEnum(body_shape)
    body_shape: body_shape;

    @IsEnum(skin_color)
    skin_color: skin_color;

    @IsEnum(hair_color)
    hair_color: hair_color;

    @IsEnum(hair_type)
    hair_type: hair_type;

    @IsEnum(eye_Color)
    eye_color: eye_Color;
}
