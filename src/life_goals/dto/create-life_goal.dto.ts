import { IsString, MinLength } from "class-validator";

export class CreateLifeGoalDto {
    @IsString()
    @MinLength(1)
    title: string
}
