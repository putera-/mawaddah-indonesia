import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Answer, Prisma } from '@prisma/client';
import { Question } from 'src/question/question.interface';

@Injectable()
export class AnswerService {
    constructor(private readonly Prisma: PrismaService) { }

    async findAll(userId: string): Promise<Question[]> {
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
            include: { biodata: true },
        });

        if (!user.biodata) throw new ForbiddenException('Biodata is not found, please create biodata first!');

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
            let answer: Answer;
            if (question.answers.length) {
                answer = question.answers[0];
            } else {
                answer = await this.Prisma.answer.create({
                    data: {
                        biodataId: user.biodata.id,
                        questionId: question.id,
                        answer: ''
                    }
                });
            }

            question.answer = answer;
            delete question.answers;
        }

        return questions;
    }

    async findOne(userId: string, questionId: string): Promise<Question> {
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
            include: { biodata: true },
        });

        if (!user.biodata) throw new ForbiddenException('Biodata is not found, please create biodata first!');

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

        if (!user.biodata) throw new ForbiddenException('Biodata is not found, please create biodata first!');

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
