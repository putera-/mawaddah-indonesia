import {
    Gender,
    ManhajStatus,
    MarriagePermission,
    MarriageStatus,
    PhysicalCharacter,
    FamilyMember,
    NonPhysicalCharacter,
    MarriagePreparation
} from '@prisma/client';
import { Education } from 'src/educations/educations.interface';
import { Experiences } from 'src/experiences/experiences.interface';
import { Ibadah } from 'src/ibadah/ibadah.interface';
import { Life_goal } from 'src/life_goals/life_goals.interface';
import { NonPhysicalCriteria } from 'src/non_physical_criteria/non_physical_criteria.interface';
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
    physical_characters?: PhysicalCharacter;
    non_physical_characters?: NonPhysicalCharacter;
    marriage_preparations?: MarriagePreparation
    family_members?: FamilyMember[];
    educations?: Education[];
    life_goals?: Life_goal[];
    ibadah?: Ibadah
    non_physical_criteria?: NonPhysicalCriteria
    experiences?: Experiences[]
}
