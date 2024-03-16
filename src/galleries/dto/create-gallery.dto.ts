import { IsOptional, IsString, Length } from "class-validator"

export class CreateGalleryDto {
    @IsString()
    @Length(1, 100)
    title: string

    @IsString()
    @IsOptional()
    photo: string
}
