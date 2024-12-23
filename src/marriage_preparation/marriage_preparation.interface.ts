import { Biodata } from "@prisma/client"

export interface MarriagePreparation {
    id: string
    biodata?: Biodata
    biodataId: string
    visi?: string
    misi?: string
    mental?: string
    mahar?: string
    cost?: string
    span_time?: string
    createdAt: Date
    updatedAt: Date
}
