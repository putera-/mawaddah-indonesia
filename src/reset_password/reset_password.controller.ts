import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req } from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';
import { CreateResetPasswordDto } from './dto/create-reset_password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset_password.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private readonly resetPasswordService: ResetPasswordService,) { }

    @Post()
    create(@Request() token: string, @Body('userEmail') email: string, data: CreateResetPasswordDto) {
        try {
            return this.resetPasswordService.create(token, email, data);

        } catch (error) {
            throw error
        }
    }

    @Patch(':id')
    update(@Body('token') token: string, @Param('id') id: string, @Body() data: ChangePasswordDto) {
        try {
            // console.log(req.user.userEmail)
            return this.resetPasswordService.update(token, id, data);

        } catch (error) {
            throw error;    
        }
    }

}
