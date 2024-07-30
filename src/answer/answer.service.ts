import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { Question } from 'src/question/question.interface';

@Injectable()
export class AnswerService {
    constructor(private readonly Prisma: PrismaService) { }

    async findAll(userId: string): Promise<Question[]> {
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
            include: { biodata: true },
        });
        const questions: Question[] = await this.Prisma.question.findMany({
            where: {
                deleted: false
            },
            include: {
                answers: {
                    where: { biodataId: user.biodata.id }
                }
            }
        });

        for (const question of questions) {
            if (question.answers.length) {
                question.answer = question.answers[0];
            }

            delete question.answers;
        }

        return questions;
    }

    async findOne(userId: string, questionId: string): Promise<Question> {
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
            include: { biodata: true },
        });

        const question: Question = await this.Prisma.question.findFirst({
            where: {
                id: questionId,
                deleted: false
            },
            include: {
                answers: {
                    where: { biodataId: user.biodata.id }
                }
            }
        });

        if (!question) throw new NotFoundException('Question is not found!');

        if (question.answers.length) {
            question.answer = question.answers[0];
        } else {
            // create empty answer
            const answer = await this.Prisma.answer.create({
                data: {
                    answer: '',
                    biodataId: user.biodata.id,
                    questionId: questionId,
                },
            });

            question.answer = answer;
        }
        delete question.answers;

        return question;
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
}
