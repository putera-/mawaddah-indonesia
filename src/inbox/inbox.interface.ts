import { Taaruf } from "src/taaruf/taaruf.interface"
import { User } from "src/users/user.interface"

export interface Inbox {
    id: string
    user?: User
    userId: string
    responder?: User
    responderId: string
    taaruf: Taaruf
    taarufId: string
    title: string
    read: boolean
    is_favourite: boolean
    createdAt?: Date
    datetime: Date
}
