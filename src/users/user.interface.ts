import { BackupDetail, Biodata, RoleStatus, Taaruf, TaarufStatus, Taaruf_gold } from '@prisma/client';
import { Auth, AuthPartial } from 'src/auth/auth.interface';

export interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password?: Password;
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
    Taaruf_gold?: Taaruf_gold[]
    isTaarufGold?: boolean
    biodata?: Biodata
    hasBiodata?: boolean
    Taaruf?: Taaruf[]
    Taaruf_candidate?: Taaruf[]
    inTaaruf?: boolean
    auth?: AuthPartial[]
    backup_detail?: BackupDetail
}

export interface Password {
    id: string;
    user?: User;
    userId: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
