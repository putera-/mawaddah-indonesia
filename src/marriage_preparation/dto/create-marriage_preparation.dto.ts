import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMarriagePreparationDto {
    @ApiProperty()
    @IsString()
    visi: string

    @ApiProperty()
    @IsString()
    misi: string

    @ApiProperty()
    @IsString()
    mental: string

    @ApiProperty()
    @IsString()
    mahar: string

    @ApiProperty()
    @IsString()
    cost: string

    @ApiProperty()
    @IsString()
    span_time: string

}
