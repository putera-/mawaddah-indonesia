export interface reset_password {
    id: string;
    userId: string;
    userEmail: string;
    token: string;
    isUsed: boolean;
    expiredAt: string;

}