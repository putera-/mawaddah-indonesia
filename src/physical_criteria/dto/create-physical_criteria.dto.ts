import {
    body_shape,
    eye_Color,
    hair_color,
    hair_type,
    skin_color,
} from '@prisma/client';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreatePhysicalCriteriaDto {
    @IsInt()
    height: number;

    @IsInt()
    weight: number;

    @IsString()
    body_shape: body_shape;

    @IsString()
    skin_color: skin_color;

    @IsString()
    hair_color: hair_color;

    @IsString()
    hair_type: hair_type;

    @IsString()
    eye_color: eye_Color;

    @IsBoolean()
    characteristic: boolean;

    @IsString()
    characteristic_detail: string;

    @IsBoolean()
    medical_history: boolean;

    @IsString()
    medical_history_detail: string;
}
