import { RoleStatus, TaarufStatus } from '@prisma/client';

export interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password?: string;
    active: boolean;
    verified: boolean;
    avatar?: string;
    avatar_md?: string;
    blurred_avatar?: string;
    blurred_avatar_md?: string;
    role: RoleStatus;
    taaruf_status: TaarufStatus;
    createdAt?: Date;
    updatedAt?: Date;
}
