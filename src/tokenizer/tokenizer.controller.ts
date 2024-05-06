import { Body, Controller, Post, Request, ValidationPipe } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-tokenizer.dto';
import { TokenizerService } from './tokenizer.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { MidtransNotificationDto } from './dto/midtransNotifications.dto';
import { TaarufStatus } from '@prisma/client';

@Controller('tokenizer')
export class TokenizerController {
    constructor(private readonly tokenizerService: TokenizerService) { }

    @Roles(Role.Member)
    @Post()
    async create(@Request() request: any, @Body(new ValidationPipe()) data: CreateTokenDto) {
        try {

            //create taaruf gold
            const taarufGold = await this.tokenizerService.createTaarufGold(request.user.id);

            //craete payment
            const payment = await this.tokenizerService.createPayment(request.user.id, data.gross_amount, taarufGold.id);

            //create token
            const token = await this.tokenizerService.generateMidtransToken(payment);

            //update payment > return payment data
            const result = await this.tokenizerService.updatePayment(payment.id, token);
            return result


        } catch (error) {
            throw error
        }
    }

    @Post("midtrans-notification")
    async midtransNotification(@Body() data: any) {

        try {
            if (data.order_id) {
                //ubah status berdasarkan dari transaction status
                //lunas
                if (data.transaction_status == "settlement") {
                    const paymentId = data.order_id

                    //tambahkan endedDate dengan cara menambah satu bulan
                    await this.tokenizerService.updateStatus(paymentId, data.transaction_status)

                    //update taarufGold
                    await this.tokenizerService.updateTaarufGold(paymentId)

                    //upsert midtrans_callback (update/create)
                    await this.tokenizerService.upsertMidtransCallback(data)
                    return { success: "OK" }
                }
                else {
                    //tidak lunas
                    await this.tokenizerService.updateStatus(data.order_id, data.transaction_status);
                }
            }

            // return result;
        } catch (error) {
            throw error
        }
    }


}
