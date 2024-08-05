import { PrismaClient } from "@prisma/client";

export function get_user_by_old_id(old_id: number, new_db: PrismaClient) {
    return new_db.user.findFirst({
        where: {
            backup_detail: {
                old_id
            }
        }
    });
}
