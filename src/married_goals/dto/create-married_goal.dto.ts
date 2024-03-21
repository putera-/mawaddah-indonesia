import { IsString, MinLength } from "class-validator";

export class CreateMarriedGoalDto {
    @IsString()
    @MinLength(1)
    title: string
}
