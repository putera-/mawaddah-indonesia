export interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    active: boolean;
    verified: boolean;
    avatar: string;
    avatar_md: string;
    role: boolean;
    taaruf_status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
