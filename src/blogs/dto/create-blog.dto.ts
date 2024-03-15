import { IsString, Length, MinLength } from "class-validator"

export class CreateBlogDto {
    @IsString()
    @Length(1, 100)
    title: string;
    
    @IsString()
    @Length(1, 100)
    @MinLength(1)
    content: string;
}
