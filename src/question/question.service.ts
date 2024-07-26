import { Injectable } from '@nestjs/common';
// import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma.service';
import { Question } from './question.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
    constructor(private Prisma: PrismaService) {}
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
        return this.Prisma.question.findMany();
    }

    findOne(id: string): Promise<Question> {
        return this.Prisma.question.findFirst({
            where: { id },
        });
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

    remove(id: string): Promise<void> {
        this.Prisma.question.update({
            where: { id },
            data: {
                deleted: true,
            },
        });
        return;
    }
}
