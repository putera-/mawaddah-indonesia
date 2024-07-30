import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswerService {
    constructor(private readonly Prisma: PrismaService) {}
    //   create(createAnswerDto: CreateAnswerDto) {
    //     return 'This action adds a new answer';
    //   }

    async findAll(userId: string) {
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
            include: { biodata: true },
        });
        return this.Prisma.answer.findMany({
            where: { biodataId: user.biodata.id },
            include: {
                question: true,
            },
        });
    }

    async findOne(userId: string, questionId: string) {
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
            include: { biodata: true },
        });

        const result = await this.Prisma.answer.findFirst({
            where: { questionId, biodataId: user.biodata.id },
            include: {
                question: true,
            },
        });

        if (!result) {
            return this.Prisma.answer.create({
                data: {
                    answer: '',
                    biodataId: user.biodata.id,
                    questionId: questionId,
                },
            });
        }
        return result;
    }

    async update(userId: string, questionId: string, data: Prisma.AnswerCreateInput) {
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
            include: { biodata: true },
        });
        return this.Prisma.answer.upsert({
            where: {
                questionId_biodataId: {
                    questionId: questionId,
                    biodataId: user.biodata.id,
                }
            },
            update: data,
            create: {
                answer: data.answer, // Or any other fields you need to create
                questionId: questionId,
                biodataId: user.biodata.id,
            },
        });
    }

    // remove(id: number) {
    //     return `This action removes a #${id} answer`;
    // }
}
