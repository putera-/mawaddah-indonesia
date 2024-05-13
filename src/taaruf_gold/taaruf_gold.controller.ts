import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Request } from '@nestjs/common';
import { TaarufGoldService } from './taaruf_gold.service';
import { CreateTaarufGoldDto } from './dto/create-taaruf_gold.dto';
import { UpdateTaarufGoldDto } from './dto/update-taaruf_gold.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { TokenizerService } from 'src/tokenizer/tokenizer.service';
import { CreateTokenDto } from 'src/tokenizer/dto/create-tokenizer.dto';


@Controller('taaruf-gold')
export class TaarufGoldController {
    constructor(
        private readonly taarufGoldService: TaarufGoldService,
        private readonly tokenizerService: TokenizerService
    ) { }


    @Roles(Role.Member)
    @Post('generate-payment')
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
