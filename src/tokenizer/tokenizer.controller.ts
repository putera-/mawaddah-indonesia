import { Body, Controller, Post, Request, ValidationPipe } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-tokenizer.dto';
import { TokenizerService } from './tokenizer.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('tokenizer')
export class TokenizerController {
    constructor(private readonly tokenizerService: TokenizerService) { }


    @Roles(Role.Member)
    @Post()
    async create(@Request() request: any, @Body(new ValidationPipe()) data: CreateTokenDto) {
        try {
            //create taaruf gold
            const taarufGold = await this.tokenizerService.createTaarufGold(request.user.id);
            console.log(taarufGold)

            //craete payment
            const payment = await this.tokenizerService.createPayment(request.user.id, taarufGold.id, data.gross_amount);
            console.log(payment)

            //create token
            const token = await this.tokenizerService.generateMidtransToken(payment);
            console.log(token)

            //update payment > return payment data
            const result = await this.tokenizerService.updatePayment(payment.id ,token);
            console.log(result)


        } catch (error) {
            console.log(error)
            throw error
        }
    }


}
