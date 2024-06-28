import { Biodata, relationship, religion } from "@prisma/client";

export interface FamilyMember {
    id: string
    biodata: Biodata
    biodataId: string
    relationship: relationship
    religion: religion
    dob: string
    education: string
    job: string
    ia_alive: boolean
    deleted: boolean
    createdAt?: Date
    updatedAt?: Date
}


