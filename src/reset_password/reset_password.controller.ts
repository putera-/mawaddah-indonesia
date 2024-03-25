import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req } from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';
import { CreateResetPasswordDto } from './dto/create-reset_password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset_password.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/auth.metadata';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private readonly resetPasswordService: ResetPasswordService,) { }

    // FIXME harus bisa di panggil tanpa login
    // FIXME validation errir
    // FIXME req token untuk apa?
    // FIXME parameter data: CreateResetPasswordDto untuk apa?
    @Post()
    create(@Request() token: string, @Body('userEmail') email: string, data: CreateResetPasswordDto) {
        try {
            return this.resetPasswordService.create(token, email, data as Prisma.ResetPasswordCreateInput);

        } catch (error) {
            throw error
        }
    }

    // FIXME harusnya bisa di akses tanpa login
    // FIXME perbaiki parameter
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
