import { IsString, MinLength } from "class-validator";

export class CreateHobbyDto {
    @IsString()
    @MinLength(1)
    title: string
}
