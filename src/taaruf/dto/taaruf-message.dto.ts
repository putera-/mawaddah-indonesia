import { IsString } from 'class-validator';

export class TaarufMessageDto {
    @IsString()
    message: string;
}
