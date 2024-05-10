import { User } from '@prisma/client';

export interface reset_password {
    id: string;
    user: User;
    userId?: string;
    used: boolean;
    expiredAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
