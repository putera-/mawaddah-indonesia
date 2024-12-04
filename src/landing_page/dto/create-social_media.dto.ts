import { IsOptional, IsString } from 'class-validator';

export class CreateSocialMediaDto {
    @IsString()
    @IsOptional()
    icon: string;

    @IsString()
    url: string;

    @IsString()
    text: string;
}
