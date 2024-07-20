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

    // FIXME enum
    @IsEnum(body_shape)
    body_shape: body_shape;

    // FIXME enum
    @IsEnum(skin_color)
    skin_color: skin_color;

    // FIXME enum
    @IsEnum(hair_color)
    hair_color: hair_color;

    // FIXME enum
    @IsEnum(hair_type)
    hair_type: hair_type;

    // FIXME enum
    @IsEnum(eye_Color)
    eye_color: eye_Color;
}
