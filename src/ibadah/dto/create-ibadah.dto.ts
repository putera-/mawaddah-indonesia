import { IbadahRawatib, ShalatFardu, StatusHaji } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateIbadahDto {
    @IsString()
    ShalatFardu: ShalatFardu;

    @IsString()
    ShalatRawatib: IbadahRawatib;

    @IsString()
    ShalatDhuha: IbadahRawatib;

    @IsString()
    ShalatTahajud: IbadahRawatib;

    @IsString()
    PuasaRamadhan: IbadahRawatib;

    @IsString()
    PuasaSeninKamis: IbadahRawatib;

    @IsString()
    PuasaDaud: IbadahRawatib;

    @IsString()
    PuasaAyamulBid: IbadahRawatib;

    @IsString()
    Zakat: IbadahRawatib;

    @IsString()
    Sedekah: IbadahRawatib;

    @IsString()
    Umrah: IbadahRawatib;

    @IsString()
    Haji: StatusHaji;
}
