import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    Req,
    ValidationPipe,
    HttpCode,
} from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';
// import { CreateResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/auth.metadata';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private readonly resetPasswordService: ResetPasswordService) {}

    // @Public()
    // @HttpCode(204)
    // @Post()
    // create(@Body(new ValidationPipe()) data: CreateResetPasswordDto) {
    //     try {
    //         return this.resetPasswordService.create(data.email);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // @Public()
    // @HttpCode(204)
    // @Patch(':id')
    // update(
    //     @Request() req: any,
    //     @Param('id') id: string,
    //     @Body(new ValidationPipe()) data: ChangePasswordDto,
    // ) {
    //     try {
    //         return this.resetPasswordService.update(id, data);
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
