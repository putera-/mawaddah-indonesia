import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TaarufGoldService } from 'src/taaruf_gold/taaruf_gold.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly taarufGoldService: TaarufGoldService
    ) { }

    @Post("midtrans-notification")
    async midtransNotification(@Body() data: any) {

        try {
            if (data.order_id) {
                //ubah status berdasarkan dari transaction status
                //lunas
                if (data.transaction_status == "settlement") {
                    const paymentId = data.order_id

                    //tambahkan endedDate dengan cara menambah satu bulan
                    await this.paymentService.updateStatus(paymentId, data.transaction_status)

                    //update taarufGold
                    await this.taarufGoldService.update(paymentId)

                    //upsert midtrans_callback (update/create)
                    await this.paymentService.upsertMidtransCallback(data)
                    return { success: "OK" }
                }
                else {
                    //tidak lunas
                    await this.paymentService.updateStatus(data.order_id, data.transaction_status);
                }
            }

            // return result;
        } catch (error) {
            throw error
        }
    }

}
