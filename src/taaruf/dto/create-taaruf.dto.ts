import { IsOptional, IsString } from 'class-validator';

export class CreateTaarufDto {
    @IsString()
    @IsOptional()
    message: string;
}
