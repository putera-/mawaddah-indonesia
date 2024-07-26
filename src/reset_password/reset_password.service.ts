import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';

import dayjs from 'dayjs';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { EmailService } from 'src/email.service';

@Injectable()
export class ResetPasswordService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
        private emailService: EmailService,
    ) { }

    async create(email: string): Promise<void> {
        // cek user by email

        const user = await this.prisma.user.findFirst({
            where: { email },
        });
        // throw jika user tidak terdaftar
        if (!user) throw new NotFoundException('Email tidak terdaftar');
        const now = new Date();
        // cek reset password yg ada dri data user yg belum terpakai
        // jika ada, ubah used = true, exp = now
        await this.prisma.resetPassword.updateMany({
            where: { userId: user.id, used: false },
            data: { used: true, expiredAt: now },
        });
        // buat baru
        const expiredAt = dayjs().add(10, 'minute').toDate();
        const data: Prisma.ResetPasswordCreateInput = {
            user: { connect: { id: user.id } },
            expiredAt,
        };
        // create reset password
        const result = await this.prisma.resetPassword.create({
            data,
        });
        await this.emailService.sendResetPassword(result.id, email);
        return;
    }

    async update(id: string, data: ChangePasswordDto): Promise<void> {
        //check if id exist
        const dataReset = await this.prisma.resetPassword.findFirst({
            where: { id, used: false },
        });
        if (!dataReset) throw new NotFoundException('Data tidak ditemukan');
        // find user by data reset userid
        const user = await this.prisma.user.findFirst({
            where: { id: dataReset.userId },
        });
        if (!user) throw new NotFoundException('User tidak terdaftar');
        // check expired at tidak boleh sama atau lebih kecil dari sekarang
        // dan check jika used = true
        if (dayjs().isAfter(dayjs(dataReset.expiredAt)) || dataReset.used) {
            await this.prisma.resetPassword.update({
                where: { id, used: true },
                data: { used: true },
            });
            throw new ForbiddenException(
                'Reset Password tidak valid, atau sudah expired',
            );
        }
        //check if password match
        await this.userService.checkPassword(data);
        // delete confirm password
        delete data.confirm_password;
        // update password.
        await this.prisma.password.update({
            where: { userId: user.id },
            data: { password: data.password },
        });
        await this.prisma.resetPassword.update({
            where: { id },
            data: { used: true },
        });
        return;
    }
}
