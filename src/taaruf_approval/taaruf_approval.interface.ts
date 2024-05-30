import { Taaruf } from 'src/taaruf/taaruf.interface';

export interface TaarufApproval {
    id: string;
    taaruf?: Taaruf;
    taarufId: string;
    status: 'Pending' | 'Yes' | 'No';
    message: string;
    reply: string;
    updatedAt: Date;
}
