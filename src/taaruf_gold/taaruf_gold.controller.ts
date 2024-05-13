import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Request } from '@nestjs/common';
import { TaarufGoldService } from './taaruf_gold.service';
import { CreateTaarufGoldDto } from './dto/create-taaruf_gold.dto';
import { UpdateTaarufGoldDto } from './dto/update-taaruf_gold.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { CreateTaarufGoldPaymentDto } from 'src/payment/dto/create-taaruf_gold-payment.dto';
import { PaymentService } from 'src/payment/payment.service';


@Controller('taaruf-gold')
export class TaarufGoldController {
    constructor(
        private readonly taarufGoldService: TaarufGoldService,
        private readonly paymentService: PaymentService
    ) { }


    @Roles(Role.Member)
    @Post('generate-payment')
    async create(@Request() request: any, @Body(new ValidationPipe()) data: CreateTaarufGoldPaymentDto) {
        try {

            //create taaruf gold
            const taarufGold = await this.paymentService.createTaarufGold(request.user.id);

            //craete payment
            const payment = await this.paymentService.createPayment(request.user.id, data.gross_amount, taarufGold.id);

            //create token
            const token = await this.paymentService.generateMidtransToken(payment);

            //update payment > return payment data
            const result = await this.paymentService.updatePayment(payment.id, token);
            return result


        } catch (error) {
            throw error
        }
    }


    @Get('active-users')
    findAllActiveUsers(@Query('page') page: number, @Query('limit') limit: number) {
        return this.taarufGoldService.findAllActiveUser(page, limit);
    }

    @Get('inactive-users')
    findAllInActiveUsers(@Query('page') page: number, @Query('limit') limit: number) {
        return this.taarufGoldService.findAllInActiveUser(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taarufGoldService.findOne(id);
    }

}
