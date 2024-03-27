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
    constructor(private prisma: PrismaService, private userService: UsersService
    ) { }

    async create(email: string): Promise<void> {
        // const token = req.headers.authorization.split(' ')[1];
        const user = await this.prisma.user.findUnique({ where: { email: email }, select: { id: true, email: true } });
        //throw if user not registered
        if (!user) throw new NotFoundException("Email is not registered");


        const expiredAt = dayjs().add(10, 'minute').toDate();
        const data: Prisma.ResetPasswordCreateInput = {
            user: { connect: { id: user.id } },
            email,
            expiredAt: expiredAt,
        }

        await this.prisma.resetPassword.create({
            data
        });

        //blabla..
        return;
    }

    async update(id: string, data: ChangePasswordDto): Promise<void> {
        //check if id exist
        const dataReset = await this.prisma.resetPassword.findUnique({ where: { id } });
        if (!dataReset) throw new NotFoundException();

        // Check if the email record exists and the token is not expired
        if (dayjs().isAfter(dayjs(dataReset.expiredAt)) || dataReset.isUsed) {
            await this.prisma.resetPassword.update({
                where: { id, isUsed: true },
                data: { isUsed: true }
            })
            throw new ForbiddenException('Token has expired or already in use');
        }

        //check if password match
        await this.userService.checkPassword(data);

        //pakai userId karena dari userServicenya dia terimanya id, bukan email.
        await this.prisma.user.update({
            where: { email: dataReset.email },
            data: { password: data.password }
        });

        await this.prisma.resetPassword.update({
            where: { id },
            data: { isUsed: true }
        })
        return;
    }
}
