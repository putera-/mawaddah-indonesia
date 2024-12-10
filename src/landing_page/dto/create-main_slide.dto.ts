import { IsOptional, IsString } from 'class-validator';

export class CreateMainSlideDto {
    @IsString()
    text: string;
}
