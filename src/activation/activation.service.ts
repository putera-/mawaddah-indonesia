import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import dayjs from 'dayjs';
import { Activation } from './entities/activation.entity';
import { EmailService } from 'src/email.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivationService {
    constructor(
        private Prisma: PrismaService,
        private emailService: EmailService,
    ) {}
    async create(email: string): Promise<Activation> {
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
        const data: any = [];
        const exp = Math.round(dayjs().add(10, 'm').valueOf()) as number;
        const expDate = new Date(exp);
        data.expiredAt = expDate;
        const userId = user.id;
        // create activation
        const result: Prisma.ActivationCreateInput =
            await this.Prisma.activation.create({
                data: {
                    ...data,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
        await this.emailService.sendActivation(result.id, email);
        return result;
    }

    findAll() {
        return `This action returns all activation`;
    }

    async findOne(id: any) {
        const find = await this.Prisma.activation.findFirst(id);
    }

    remove(id: number) {
        return `This action removes a #${id} activation`;
    }
}
