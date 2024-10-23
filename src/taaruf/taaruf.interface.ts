import { ApprovalStatus, TaarufProcess } from '@prisma/client';
import { Akad } from 'src/akad/akad.interface';
import { Inbox } from 'src/inbox/inbox.interace';
import { Khitbah } from 'src/khitbah/khitbah.interface';
import { Nadhar } from 'src/nadhar/nadhar.interface';
import { User } from 'src/users/user.interface';

export interface Taaruf {
    id: string;
    user?: User;
    userId: string;
    candidate?: User;
    candidateId: string;
    active: boolean;
    status: ApprovalStatus;
    message: string;
    taaruf_process: TaarufProcess
    nadhars?: Nadhar[];
    khitbahs?: Khitbah[];
    akads?: Akad[];
    cancelation?: TaarufCancelation
    Inbox?: Inbox[];
    response?: Response
    createdAt: Date;
    updatedAt: Date;
}


export interface TaarufCancelation {
    id: string
    taaruf?: Taaruf
    taarufId: string
    cancelById: string
    cancelBy?: User
    message: string
    response?: Response
    createdAt: Date;
    updatedAt: Date;
}

export interface Response {
    id: string
    responseBy?: User
    responseById: string
    taaruf?: Taaruf
    taarufId?: string
    taarufCancelation?: TaarufCancelation
    taarufCancelationId?: string
    nadhar?: Nadhar
    nadharId?: string
    khitbah?: Khitbah
    khitbahId?: string
    akad?: Akad
    akadId?: string
    message: string
    createdAt: Date;
    updatedAt: Date;
}
