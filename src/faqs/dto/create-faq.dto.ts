import { IsString, Length } from "class-validator";

export class CreateFaqDto {
    @IsString()
    @Length(1, 100)
    question: string;

    @IsString()
    @Length(1, 100)
    answer: string;
}
