import { Biodata, relationship, religion } from "@prisma/client";

export interface FamilyMember {
    id: string
    Biodata: Biodata
    biodataId: string
    relationship: relationship
    religion: religion
    dob: Date
    education: string
    job: string
    ia_alive: boolean
    deleted: boolean
    createdAt?: Date
    updatedAt?: Date
}


