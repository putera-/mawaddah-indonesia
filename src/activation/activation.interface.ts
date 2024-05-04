import { User } from '@prisma/client';

export interface Activation {
    id: string;
    userId?: User;
    used: boolean;
    expiredAt?: Date;
    createdAt?: Date;
}
