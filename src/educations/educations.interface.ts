export interface Education {
    id: string
    client_id?: string
    institution_name: string
    major?: string
    degree?: string
    city?: string
    startYear: number
    endYear: number
    deleted: boolean
    createdAt: Date
    updatedAt: Date
}