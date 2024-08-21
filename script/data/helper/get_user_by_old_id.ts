import { PrismaClient } from '@prisma/client';

export async function get_user_by_old_id(old_id: number, new_db: PrismaClient) {
    const backup = await new_db.backupDetail.findFirst({
        where: {
            old_id,
        },
        include: { user: true },
    });

    if (backup) {
        return backup.user;
    }

    return null;
}
