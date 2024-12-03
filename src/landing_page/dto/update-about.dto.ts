import { LandingPage } from '@prisma/client';
import { IsString } from 'class-validator';

export class UpdateAboutDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}
