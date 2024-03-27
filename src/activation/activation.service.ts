import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import dayjs from 'dayjs';
import { Activation } from './entities/activation.entity';
import { EmailService } from 'src/email.service';

@Injectable()
export class ActivationService {
    constructor(
        private Prisma: PrismaService,
        private emailService: EmailService,
    ) {}
    async create(email: string): Promise<Activation> {
        const exist = await this.Prisma.activation.findFirst({
            where: { email },
        });
        if (exist) throw new ConflictException();
        const data: any = [];
        const exp = Math.round(dayjs().add(1, 'h').valueOf()) as number;
        const expDate = new Date(exp);
        const random = this.getRandomIntInclusive(5, 15);
        data.activation_key = `"${random}"`;
        data.expiredAt = expDate;
        const result = await this.Prisma.activation.create({
            data: {
                ...data,
                user: {
                    connect: { email },
                },
            },
        });
        await this.emailService.sendToken(result.id);
        return result;
    }
    getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min); // Round `min` up to the nearest integer
        max = Math.floor(max); // Round `max` down to the nearest integer
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    findAll() {
        return `This action returns all activation`;
    }

    findOne(id: number) {
        return `This action returns a #${id} activation`;
    }

    remove(id: number) {
        return `This action removes a #${id} activation`;
    }
}
