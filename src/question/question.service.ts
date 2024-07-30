import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma.service';
import { Question } from './question.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
    constructor(private Prisma: PrismaService) { }
    async create(
        id: string,
        data: Prisma.QuestionCreateInput,
    ): Promise<Question> {
        return await this.Prisma.question.create({
            data: {
                question: data.question,
                createdBy: {
                    connect: { id },
                },
            },
        });
    }

    findAll(): Promise<Question[]> {
        return this.Prisma.question.findMany({
            where: {
                deleted: false
            }
        });
    }

    async findOne(id: string): Promise<Question> {
        const question = await this.Prisma.question.findFirst({
            where: {
                id,
                deleted: false
            },
        });

        if (!question) throw new NotFoundException("Question is not found");

        return question;
    }

    async update(
        id: string,
        data: Prisma.QuestionUpdateInput,
    ): Promise<Question> {
        return await this.Prisma.question.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<void> {
        await this.Prisma.question.update({
            where: { id },
            data: {
                deleted: true,
            },
        });
        return;
    }
}
