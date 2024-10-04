import {
    ApprovalStatus
} from '@prisma/client'
import { Response, Taaruf } from 'src/taaruf/taaruf.interface';
import { User } from 'src/users/user.interface';

export interface Nadhar {
    id: string;
    Taaruf?: Taaruf;
    taarufId: string;
    requestBy?: User
    requestById: string
    schedule: Date;
    status: ApprovalStatus;
    message: string;
    response?: Response
    createdAt: Date;
    updatedAt: Date;
}
