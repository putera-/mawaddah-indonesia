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
    role: 'MEMBER' | 'ADMIN' | 'SUPERADMIN';
    taaruf_status: 'OPEN' | 'PENDING' | 'BLOCKED';
    createdAt?: Date;
    updatedAt?: Date;
}
