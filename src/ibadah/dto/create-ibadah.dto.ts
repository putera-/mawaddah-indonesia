import { Cycle, ShalatFardu } from '@prisma/client';
import { IsBoolean, IsString } from 'class-validator';

export class CreateIbadahDto {
    @IsString()
    ShalatFardu: ShalatFardu;

    @IsString()
    ShalatRawatib: Cycle;

    @IsString()
    ShalatDhuha: Cycle;

    @IsString()
    ShalatTahajud: Cycle;

    @IsString()
    PuasaRamadhan: Cycle;

    @IsString()
    PuasaSeninKamis: Cycle;

    @IsString()
    PuasaDaud: Cycle;

    @IsString()
    PuasaAyamulBid: Cycle;

    @IsString()
    Zakat: Cycle;

    @IsString()
    Sedekah: Cycle;

    @IsString()
    Umrah: Cycle;

    @IsBoolean()
    Haji: boolean;
}
