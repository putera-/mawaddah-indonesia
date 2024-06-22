import {
    Gender,
    ManhajStatus,
    MarriagePermission,
    MarriageStatus,
    PhysicalCharacter,
    Non_physical_char,
    FamilyMember
} from '@prisma/client';
import { User } from 'src/users/user.interface';

export interface Biodata {
    id: string;
    user?: User;
    userId: string;
    bio: string;
    phone: string;
    company?: string;
    manhaj: ManhajStatus;
    gender: Gender;
    marriage_status: MarriageStatus;
    marriage_permission: MarriagePermission;
    physical_characters?: PhysicalCharacter;
    non_physical_characters?: Non_physical_char;
    family_members?: FamilyMember[];
    dob: Date;
    birth_place: string;
    birth_order: number;
    domicile_town: string;
    domicile_province: string;
    hometown_province: string;
    address_zip_code: number;
    ethnic: string;
    poligami_opinion?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
