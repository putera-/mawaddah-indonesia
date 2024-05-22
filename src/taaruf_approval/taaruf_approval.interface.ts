import { AprrovalStatus, Taaruf } from "src/taaruf/taaruf.interface"

export interface TaarufApproval {
    id: string
    taaruf?: Taaruf
    taarufId: string
    status: AprrovalStatus
    reason: string
    updatedAt: Date
}
