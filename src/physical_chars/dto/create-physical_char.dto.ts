import { IsString, MinLength } from "class-validator";

export class CreatePhysicalCharDto {
    @IsString()
    @MinLength(1)
    title: string

    @IsString()
    @MinLength(1)
    description: string
}
