import { IsString } from "class-validator";

export class CreateMarriagePreparationDto {
    @IsString()
    visi: string

    @IsString()
    misi: string

    @IsString()
    mental: string

    @IsString()
    mahar: string

    @IsString()
    cost: string

    @IsString()
    span_time: string

}
