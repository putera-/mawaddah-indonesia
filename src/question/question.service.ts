import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma.service';
import { Question } from './question.interface';

@Injectable()
export class QuestionService {
    constructor(private Prisma: PrismaService) {}
    async create(id: string, data: CreateQuestionDto): Promise<Question> {
        return await this.Prisma.question.create({
            data: {
                question: data.question,
                createdBy: {
                    connect: { id },
                },
            },
        });
    }

    findAll() {
        return `This action returns all question`;
    }

    findOne(id: number) {
        return `This action returns a #${id} question`;
    }

    // update(id: number, updateQuestionDto: UpdateQuestionDto) {
    //     return `This action updates a #${id} question`;
    // }

    remove(id: number) {
        return `This action removes a #${id} question`;
    }
}
