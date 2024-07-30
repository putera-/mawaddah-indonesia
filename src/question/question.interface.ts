import { Answer, User } from '@prisma/client';

export interface Question {
    id: string;
    question: string;
    deleted: boolean;
    createdBy?: User;
    userId: string;
    answers?: Answer[];
    answer?: Answer;
    createdAt: Date;
    updatedAt: Date;
}
