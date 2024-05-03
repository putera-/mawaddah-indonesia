import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import MidtransClient from 'midtrans-client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenizerService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }
    async createTaarufGold(userId: string) {
        const data = await this.prismaService.taaruf_gold.create({
            data: { userId }
        })
        return data;
    }
    async createPayment(userId: string, taaruf_goldId: string, gross_amount: number) {
        const data: Prisma.PaymentCreateInput = {
            user: { connect: { id: userId } },
            taaruf_gold: { connect: { id: taaruf_goldId } },
            gross_amount
        };

        const response = await this.prismaService.payment.create({
            data
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
}
