import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import MidtransClient from 'midtrans-client';

@Injectable()
export class PaymentService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createPayment(userId: string, gross_amount: number, taaruf_goldId: string) {
        const data: Prisma.PaymentCreateInput = {
            user: { connect: { id: userId } },
            taaruf_gold: { connect: { id: taaruf_goldId } },
            gross_amount
        };

        const response = await this.prismaService.payment.create({
            data,
            select: {
                id: true,
                gross_amount: true,
                taaruf_gold: true
            }
        });
        return response;
    }



    async generateMidtransToken(payment: any) {
        let data = new MidtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        }
        );
        try {
            const parameter = {
                "transaction_details": {
                    "order_id": payment.id,
                    "gross_amount": Number(payment.gross_amount)
                },
                "credit_card": {
                    "secure": true
                }
            }

            const token = await data.createTransactionToken(parameter);
            return token;

        } catch (error) {
            throw error;
        }
    }

    async updatePayment(paymentId: string, token: string) {
        const data = await this.prismaService.payment.update({
            where: { id: paymentId },
            data: { midtransToken: token },
            select: { id: true, gross_amount: true, midtransToken: true, paidAt: true, status: true, createdAt: true, updatedAt: true },
        });
        return data;
    }

    async updateStatus(paymentId: string, transStatus: string) {
        const paidDate = new Date()

        const checkPaymentId = await this.prismaService.payment.findFirst({
            where: { id: paymentId }
        })


        if (!checkPaymentId) throw new NotFoundException()
        console.log(checkPaymentId)

        await this.prismaService.payment.findUnique({
            where: { id: paymentId },
        });

        await this.prismaService.payment.update({
            where: { id: paymentId },
            data: { status: transStatus, paidAt: paidDate },
        });
    }


    async upsertMidtransCallback(data: any) {
        const payment_id = data.order_id
        const midtransData: Prisma.Midtrans_callbackCreateInput = {
            payment: {
                connect: { id: payment_id }
            },
            callback_data: JSON.stringify(data)
        }
        const response = await this.prismaService.midtrans_callback.upsert({
            where: { paymentId: payment_id },
            create: midtransData,
            update: midtransData,
        })
        return response
    }
}
