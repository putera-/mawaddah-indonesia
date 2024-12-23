import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ValidationPipe,
    Request,
} from '@nestjs/common';
import { TaarufGoldService } from './taaruf_gold.service';
// import { CreateTaarufGoldDto } from './dto/create-taaruf_gold.dto';
// import { UpdateTaarufGoldDto } from './dto/update-taaruf_gold.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { CreateTaarufGoldPaymentDto } from 'src/payment/dto/create-taaruf_gold-payment.dto';
import { PaymentService } from 'src/payment/payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateTaarufGoldDoc,
    GetAllActiveGoldUsersDoc,
    GetAllInactiveGoldUserDoc,
} from './taaruf_gold.doc';

@ApiTags('Taaruf Gold')
@ApiBearerAuth()
@Controller('taaruf-gold')
export class TaarufGoldController {
    constructor(
        private readonly taarufGoldService: TaarufGoldService,
        private readonly paymentService: PaymentService,
    ) {}

    @CreateTaarufGoldDoc()
    @Roles(Role.Member)
    @Post('generate-payment')
    async create(
        @Request() request: any,
        @Body(new ValidationPipe()) data: CreateTaarufGoldPaymentDto,
    ) {
        try {
            //create taaruf gold
            const taarufGold = await this.taarufGoldService.create(
                request.user.id,
            );

            //craete payment
            const payment = await this.paymentService.createPayment(
                request.user.id,
                data.gross_amount,
                taarufGold.id,
            );

            //create token
            const token =
                await this.paymentService.generateMidtransToken(payment);

            //update payment > return payment data
            const result = await this.paymentService.updatePayment(
                payment.id,
                token,
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    @GetAllActiveGoldUsersDoc()
    @Roles(Role.Admin, Role.Superadmin)
    @Get('active-users')
    findAllActiveUsers(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        return this.taarufGoldService.findAllActiveUser(page, limit);
    }

    @GetAllInactiveGoldUserDoc()
    @Roles(Role.Admin, Role.Superadmin)
    @Get('inactive-users')
    findAllInActiveUsers(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        return this.taarufGoldService.findAllInActiveUser(page, limit);
    }
}
