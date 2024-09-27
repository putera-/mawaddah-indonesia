import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import dayjs from 'dayjs';
import { EmailService } from 'src/email.service';
import { Activation, Prisma } from '@prisma/client';

@Injectable()
export class ActivationService {
    constructor(
        private Prisma: PrismaService,
        private emailService: EmailService,
    ) {}
    async create(email: string): Promise<void> {
        // cek user by email
        const user = await this.Prisma.user.findFirst({
            where: { email },
        });

        // throw jika user tidak terdaftar
        if (!user) throw new NotFoundException('Email tidak terdaftar');
        const now = new Date();
        // cek activation yg ada dri data user yg belum terpakai
        // jika ada, ubah used = true, exp = now
        await this.Prisma.activation.updateMany({
            where: { userId: user.id, used: false },
            data: { used: true, expiredAt: now },
        });

        // buat baru
        const exp = Math.round(dayjs().add(10, 'm').valueOf()) as number;
        const expDate = new Date(exp);
        const userId = user.id;
        const data: Prisma.ActivationCreateInput = {
            expiredAt: expDate,
            user: {
                connect: { id: userId },
            },
        };

        // create activation
        const result = await this.Prisma.activation.create({ data });
        await this.emailService.sendActivation(result.id, email);
        return;
    }

    async findOne(id: any) {
        const find = await this.Prisma.activation.findFirst(id);
    }

}
