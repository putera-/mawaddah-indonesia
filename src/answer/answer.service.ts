import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnswerService {
    constructor(private readonly Prisma: PrismaService) {}
    //   create(createAnswerDto: CreateAnswerDto) {
    //     return 'This action adds a new answer';
    //   }

    findAll() {
        return this.Prisma.answer.findMany();
    }

    findOne(id: string) {
        return this.Prisma.answer.findFirst({
            where: { id },
        });
    }

    update(id: string, data: UpdateAnswerDto) {
        return this.Prisma.answer.update({
            where: { id },
            data,
        });
    }

    // remove(id: number) {
    //     return `This action removes a #${id} answer`;
    // }
}
