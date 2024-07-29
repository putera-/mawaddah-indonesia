import { Biodata, Question } from '@prisma/client';

export interface Answer {
    biodata?: Biodata;
    biodataId: string;
    question?: Question;
    questionId: string;
    answer: string;
    createdAt?: Date;
    updatedAt?: Date;
}
