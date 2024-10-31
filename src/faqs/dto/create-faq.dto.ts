import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateFaqDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
    question: string;

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    answer: string;
}
