import { ApiProperty } from '@nestjs/swagger';
import { Cycle, ShalatFardu } from '@prisma/client';
import { IsBoolean, IsEnum } from 'class-validator';

export class CreateIbadahDto {
    @ApiProperty()
    @IsEnum(ShalatFardu)
    shalat_fardu: ShalatFardu;

    @ApiProperty()
    @IsEnum(Cycle)
    shalat_rawatib: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    shalat_dhuha: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    shalat_tahajud: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    puasa_ramadhan: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    puasa_senin_kamis: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    puasa_daud: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    puasa_ayamul_bid: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    zakat: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    sedekah: Cycle;

    @ApiProperty()
    @IsEnum(Cycle)
    umrah: Cycle;

    @ApiProperty()
    @IsBoolean()
    haji: boolean;
}
