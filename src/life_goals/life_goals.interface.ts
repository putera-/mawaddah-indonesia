import { Biodata } from "@prisma/client"

export interface Life_goal {
    id: string
    career?: string
    domicile?: string
    child_count?: string
    child_education?: string
    financial_arrangement?: string
    knowledge_upgrade?: string
    short_term_achievement?: string
    long_term_achievement?: string
    wife_work_permit?: boolean
    wife_work_permit_desc?: string
    createdAt: Date
    updatedAt: Date
    Biodata?: Biodata
    biodataId: string

}
