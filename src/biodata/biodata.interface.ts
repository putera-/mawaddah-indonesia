import { PhysicalCharacter } from '@prisma/client';
import { Non_physical_char } from 'src/non_physical_characters/non_physical_charactrer.interface';
import { User } from 'src/users/user.interface';

export interface Biodata {
    id: string;
    user?: User;
    userId: string;
    bio: string;
    phone: string;
    manhaj: 'SALAF' | 'BARU_BELAJAR' | 'NON_SALAF';
    gender: 'PRIA' | 'WANITA';
    marriage_status: 'LAJANG' | 'MENIKAH' | 'DUDA' | 'JANDA';
    marriage_permission: 'POLIGAMI' | 'NON_POLIGAMI';
    dob: Date;
    birth_place: string;
    birth_order: number;
    domicile_town: string;
    domicile_province: string;
    physical_characters?: PhysicalCharacter;
    non_physical_characters?: Non_physical_char;
    hometown_province: string;
    ethnic: string;
    createdAt?: Date;
    updatedAt?: Date;
}
