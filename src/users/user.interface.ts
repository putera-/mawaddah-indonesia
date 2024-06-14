import { RoleStatus, TaarufStatus } from "@prisma/client";
import { Biodata } from "src/biodata/biodata.interface";

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
    biodata?: Biodata
    createdAt?: Date;
    updatedAt?: Date;
}
