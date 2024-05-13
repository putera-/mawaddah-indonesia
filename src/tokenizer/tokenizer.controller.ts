import { Body, Controller, Post, Request, ValidationPipe } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-tokenizer.dto';
import { TokenizerService } from './tokenizer.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('tokenizer')
export class TokenizerController {
    constructor(private readonly tokenizerService: TokenizerService) { }


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
