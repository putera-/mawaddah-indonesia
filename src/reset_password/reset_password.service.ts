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

    //TODO TINGGAL BIKIN VALIDASINYA DAN BLABLA
    async create(token: string, userEmail: string, data: Prisma.Reset_passwordCreateInput) {
        // const token = req.headers.authorization.split(' ')[1];
        const user = await this.prisma.user.findUnique({ where: { email: userEmail }, select: { id: true, email: true } });
        console.log(user.email)
        // Check if the email record exists and the token is not expired
        const expiredAt = dayjs().add(1, 'minute').toDate();

        const result = await this.prisma.reset_password.create({
            data: {
                ...data,
                user: { connect: { id: user.id } },
                userEmail,
                expiredAt: expiredAt,
            }

        });

        //ini code buat ngirim email
        //blabla..
        return result;
    }

    async update(token: string, id: string, data: ChangePasswordDto) {
        // const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true } });
        const user = await this.prisma.reset_password.findUnique({ where: { id, isUsed: false }, select: { id: true, userEmail: true, expiredAt: true, token: true, isUsed: true } });
        if (!user) throw new NotFoundException();

        // Check if the email record exists and the token is not expired
        if (!user.userEmail || dayjs().isAfter(dayjs(user.expiredAt)) || user.isUsed) {
            await this.prisma.reset_password.update({
                where: { id, isUsed: false },
                data: { isUsed: true }
            })
            throw new ForbiddenException('Token has expired');
        } else if (!user.userEmail) {
            throw new NotFoundException('Email doesnt exist');
        }
        await this.userService.checkPassword(data);

        //pakai userId karena dari userServicenya dia terimanya id, bukan email.
        // const result = await this.userService.updatePassword(email.userId, data.password);
        const result = await this.prisma.user.update({
            where: { email: user.userEmail },
            data: { password: data.password },
            select: { id: true, email: true }
        });

        await this.prisma.reset_password.update({
            where: { id, isUsed: false },
            data: { isUsed: true }
        })



        return result;

    }


}
