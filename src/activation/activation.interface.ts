import { User } from '@prisma/client';

export interface Activation {
    id: string;
    email: User;
    activation_key: string;
    used: boolean;
    expiredAt?: Date;
    createdAt?: Date;
}
