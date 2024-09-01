import { PrismaClient } from "@prisma/client";

export async function get_superadmin(new_db: PrismaClient) {
    let superadmin = await new_db.user.findFirst({
        where: {
            role: "SUPERADMIN"
        }
    });

    if (!superadmin) {
        superadmin = await new_db.user.create({
            data: {
                firstname: 'Super',
                lastname: 'Admin',
                email: 'superadmin@prisma.io',
                active: true,
                verified: true,
                avatar: '/dummy/abang.png',
                avatar_md: '/dummy/abang.png',
                role: "SUPERADMIN",
                activations: {
                    create: {
                        expiredAt: new Date(),
                    },
                },
                password: {
                    create: {
                        password: "rahasia"
                    }
                }
            }
        })
    }
    return superadmin;
}
