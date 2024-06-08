import { Akad } from 'src/akad/akad.interface';
import { Khitbah } from 'src/khitbah/khitbah.interface';
import { Nadhar } from 'src/nadhar/nadhar.interface';
import { TaarufApproval } from 'src/taaruf_approval/taaruf_approval.interface';
import { User } from 'src/users/user.interface';

export interface Taaruf {
    id: string;
    user?: User;
    userId: string;
    candidate?: User;
    candidateId: string;
    status: boolean;
    message: string;
    approval?: TaarufApproval;
    nadhars?: Nadhar[];
    khitbahs?: Khitbah[];
    akads?: Akad[];
    createdAt: Date;
    updatedAt: Date;
}
