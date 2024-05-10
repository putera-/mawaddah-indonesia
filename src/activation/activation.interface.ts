import { User } from '@prisma/client';

export interface Activation {
    id: string;
    user: User;
    userId?: String;
    used: boolean;
    expiredAt?: Date;
    createdAt?: Date;
}
