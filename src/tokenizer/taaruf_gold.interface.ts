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

export interface Payment {
    id: string,
    user?: User,
    userId: string,
    gross_amount: Number,
    midtransToken?: string,
    status: string,
    paidAt?: Date,
    midtrans?: Midtrans,
    createdAt: Date,
    updatedAt: Date,
    taaruf_gold?: Taaruf_gold,
    taaruf_goldId: string
}

export interface Midtrans {
    id: string,
    payment?: Payment,
    paymentId: string,
    callback_data: string,
    createdAt: Date
}

