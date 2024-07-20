import { Cycle, ShalatFardu } from '@prisma/client';
import { IsBoolean, IsEnum } from 'class-validator';

export class CreateIbadahDto {
    @IsEnum(ShalatFardu)
    shalat_fardu: ShalatFardu;

    @IsEnum(Cycle)
    shalat_rawatib: Cycle;

    @IsEnum(Cycle)
    shalat_dhuha: Cycle;

    @IsEnum(Cycle)
    shalat_tahajud: Cycle;

    @IsEnum(Cycle)
    puasa_ramadhan: Cycle;

    @IsEnum(Cycle)
    puasa_senin_kamis: Cycle;

    @IsEnum(Cycle)
    puasa_daud: Cycle;

    @IsEnum(Cycle)
    puasa_ayamul_bid: Cycle;

    @IsEnum(Cycle)
    zakat: Cycle;

    @IsEnum(Cycle)
    sedekah: Cycle;

    @IsEnum(Cycle)
    umrah: Cycle;

    @IsBoolean()
    haji: boolean;
}
