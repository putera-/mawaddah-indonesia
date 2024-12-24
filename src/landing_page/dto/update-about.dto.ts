import { IsOptional, IsString } from 'class-validator';

export class UpdateAboutDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    footer_description: string;
}
