import { AprovalStatus } from '@prisma/client';
import { Taaruf } from 'src/taaruf/taaruf.interface';

export interface Khitbah {
    id: string;
    Taaruf?: Taaruf;
    taarufId: string;
    schedule: Date;
    status: AprovalStatus;
    message: string;
    reply: string;
    createdAt: Date;
    updatedAt: Date;
}
