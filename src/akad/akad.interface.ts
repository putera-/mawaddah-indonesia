import { AprrovalStatus, Taaruf } from "src/taaruf/taaruf.interface"

export interface Akad {
    id: string
    Taaruf?: Taaruf
    taarufId: string
    schedule: Date
    status: AprrovalStatus
    reason: string
    createdAt: Date
    updatedAt: Date
}
