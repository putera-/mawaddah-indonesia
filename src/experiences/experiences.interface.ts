import { Biodata, ExperienceType } from "@prisma/client"

export interface Experiences {
    id: string
    biodata: Biodata
    biodataId: string
    type: ExperienceType
    start_year:number
    end_year:number
    position:string
    description:string
    createdAt: Date
    updatedAt: Date
}
