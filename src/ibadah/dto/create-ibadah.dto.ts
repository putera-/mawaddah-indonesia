import { Cycle, ShalatFardu } from '@prisma/client';
import { IsBoolean, IsString } from 'class-validator';

export class CreateIbadahDto {
    @IsString()
    shalat_fardu: ShalatFardu;

    @IsString()
    shalat_rawatib: Cycle;

    @IsString()
    shalat_dhuha: Cycle;

    @IsString()
    shalat_tahajud: Cycle;

    @IsString()
    puasa_ramadhan: Cycle;

    @IsString()
    puasa_senin_kamis: Cycle;

    @IsString()
    puasa_daud: Cycle;

    @IsString()
    puasa_ayamul_bid: Cycle;

    @IsString()
    zakat: Cycle;

    @IsString()
    sedekah: Cycle;

    @IsString()
    umrah: Cycle;

    @IsBoolean()
    haji: boolean;
}
