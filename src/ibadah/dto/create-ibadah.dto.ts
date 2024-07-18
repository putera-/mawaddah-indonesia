import { Cycle, ShalatFardu } from '@prisma/client';
import { IsBoolean, IsString } from 'class-validator';

export class CreateIbadahDto {
    // FIXME enum
    @IsString()
    shalat_fardu: ShalatFardu;

    // FIXME enum
    @IsString()
    shalat_rawatib: Cycle;

    // FIXME enum
    @IsString()
    shalat_dhuha: Cycle;

    // FIXME enum
    @IsString()
    shalat_tahajud: Cycle;

    // FIXME enum
    @IsString()
    puasa_ramadhan: Cycle;

    // FIXME enum
    @IsString()
    puasa_senin_kamis: Cycle;

    // FIXME enum
    @IsString()
    puasa_daud: Cycle;

    // FIXME enum
    @IsString()
    puasa_ayamul_bid: Cycle;

    // FIXME enum
    @IsString()
    zakat: Cycle;

    // FIXME enum
    @IsString()
    sedekah: Cycle;

    // FIXME enum
    @IsString()
    umrah: Cycle;

    @IsBoolean()
    haji: boolean;
}
