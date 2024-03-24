import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResetPasswordDto } from './dto/create-reset_password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset_password.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

import dayjs from 'dayjs';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';

@Injectable()
export class ResetPasswordService {
    constructor(private prisma: PrismaService, private userService: UsersService, private authService: AuthService, private jwtService: JwtService,
    ) { }

    // TODO TINGGAL BIKIN VALIDASINYA DAN BLABLA
    //  TODO parameter token buat apa?
    async create(token: string, userEmail: string, data: Prisma.ResetPasswordCreateInput) {
        // const token = req.headers.authorization.split(' ')[1];
        const user = await this.prisma.user.findUnique({ where: { email: userEmail }, select: { id: true, email: true } });
        console.log(user.email)
        // Check if the email record exists and the token is not expired
        const expiredAt = dayjs().add(1, 'minute').toDate();

        const result = await this.prisma.resetPassword.create({
            data: {
                ...data,
                user: { connect: { id: user.id } },
                userEmail,
                expiredAt: expiredAt,
            }

        });

        // TODO code buat ngirim email
        //blabla..
        return result;
    }

    async update(token: string, id: string, data: ChangePasswordDto) {
        // const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true } });
        const user = await this.prisma.resetPassword.findUnique({ where: { id }, select: { id: true, userEmail: true, expiredAt: true, token: true, isUsed: true } });
        if (!user) throw new NotFoundException('id itu gaada');

        // Check if the email record exists and the token is not expired
        if (!user.userEmail || dayjs().isAfter(dayjs(user.expiredAt)) || user.isUsed) {
            await this.prisma.resetPassword.update({
                where: { id, isUsed: true },
                data: { isUsed: true }
            })
            throw new ForbiddenException('Token has expired');
        }

        await this.userService.checkPassword(data);

        //pakai userId karena dari userServicenya dia terimanya id, bukan email.
        // const result = await this.userService.updatePassword(email.userId, data.password);
        const result = await this.prisma.user.update({
            where: { email: user.userEmail },
            data: { password: data.password },
            select: { id: true, email: true }
        });

        await this.prisma.resetPassword.update({
            where: { id, isUsed: false },
            data: { isUsed: true }
        })



        return result;

    }


}
