import { IsString } from 'class-validator';

export class UpdateAboutDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    footer_description: string;
}
