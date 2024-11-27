import { IsOptional, IsString } from 'class-validator';

export class CreateMainSlideDto {
    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    image: string;
}
