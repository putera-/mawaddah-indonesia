import { IsString, Length } from 'class-validator';

export class CreateProvinceDto {
    @IsString()
    @Length(1, 100)
    name: string;
}
