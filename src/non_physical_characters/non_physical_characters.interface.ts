import { Biodata } from "@prisma/client"

export interface Non_physical_char {
    id: string
    motto: string
    life_goal: string
    hobby: string
    spare_time_activity: string
    positive_traits: string
    negative_traits: string
    liked_things: string
    unliked_things: string
    drink_alcohol: boolean
    smoking: boolean
    createdAt: Date
    updatedAt: Date
    biodata?: Biodata
    biodataId: string
}
