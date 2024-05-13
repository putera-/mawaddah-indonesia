import { Payment } from "src/payment/payment.interface";
import { User } from "src/users/user.interface";

export interface Taaruf_gold {
    id: string,
    user?: User,
    userId: string,
    startedAt?: Date,
    endingAt?: Date,
    createdAt: Date,
    updatedAt: Date,
    Payment: Payment
}
