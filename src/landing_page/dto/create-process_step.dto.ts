import { IsOptional, IsString } from 'class-validator';

export class CreateProcessStepDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    svg: string;
}
