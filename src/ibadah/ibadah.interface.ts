import { Biodata, Cycle, ShalatFardu } from '@prisma/client';

export interface Ibadah {
    shalat_fardu: ShalatFardu;
    shalat_rawatib: Cycle;
    shalat_dhuha: Cycle;
    shalat_tahajud: Cycle;
    puasa_ramadhan: Cycle;
    puasa_senin_kamis: Cycle;
    puasa_daud: Cycle;
    puasa_ayamul_bid: Cycle;
    zakat: Cycle;
    sedekah: Cycle;
    umrah: Cycle;
    haji: boolean;
    biodata?: Biodata;
    biodataId: string;
    createdAt: Date;
    updatedAt: Date;
}
