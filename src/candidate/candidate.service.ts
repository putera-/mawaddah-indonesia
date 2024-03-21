import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
const select = {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    active: true,
    verified: true,
    avatar: true,
    avatar_md: true,
    role: true,
    taaruf_status: true,
    createdAt: true,
};
@Injectable()
export class CandidateService {
    constructor(private Prisma: PrismaService) {}
    async findNew(gender: any, query: Record<string, any>) {
        let oppositeGender: any;
        if (gender === 'PRIA') oppositeGender = 'WANITA';
        else if (gender === 'WANITA') oppositeGender = 'PRIA';
        const limit = parseInt(query.limit);
        const newUsers = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    id: { not: undefined },
                    gender: oppositeGender,
                },
            },
            select: { ...select },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            take: limit,
        });
        return newUsers;
    }

    findSuggestion(query: Record<string, any>) {
        const limit = parseInt(query.limit);
        // return `This action returns a #${id} candidate`;
    }
    findLike(id: string) {
        return `This action returns a #${id} candidate`;
    }
}
