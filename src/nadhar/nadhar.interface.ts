import { Taaruf } from 'src/taaruf/taaruf.interface';

export interface Nadhar {
    id: string;
    Taaruf?: Taaruf;
    taarufId: string;
    schedule: Date;
    status: 'Pending' | 'Yes' | 'No';
    message: string;
    reply: string;
    createdAt: Date;
    updatedAt: Date;
}
