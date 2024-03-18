import { User } from 'src/users/user.interface';

export interface Auth {
    id: string;
    user: User;
    userId: string;
    access_token: string;
    expiredAt?: bigint;
    path: string;
    method: string;
    createdAt?: Date;
}
