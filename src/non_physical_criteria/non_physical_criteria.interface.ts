import { Biodata, MarriageStatus } from '@prisma/client';

export interface Non_physical_criteria {
    id: string;
    age: number;
    domicile: string;
    education: string;
    married_status: MarriageStatus;
    sport: string;
    hobby: string;
    traits: string;
    ethnic: string;
    job: string;
    other: string;
    Biodata: Biodata;
    biodataId: string;
}
