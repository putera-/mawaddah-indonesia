import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
let select = {
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
        const oppositeGender = this.getOppositeGender(gender);
        const limit = parseInt(query.limit);
        const newUsers = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    id: { not: undefined },
                    gender: oppositeGender,
                },
            },
            select: { ...select, biodata: true },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            take: limit,
        });
        return newUsers;
    }
    getOppositeGender(gender: any) {
        let oppositeGender: any;
        if (gender === 'PRIA') oppositeGender = 'WANITA';
        else if (gender === 'WANITA') oppositeGender = 'PRIA';
        return oppositeGender;
    }
    async findSuggestion(gender: any, query: Record<string, any>) {
        const oppositeGender = this.getOppositeGender(gender);
        const limit = parseInt(query.limit) | 10;
        const suggestions = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    gender: oppositeGender,
                },
            },
            include: {
                Skill: { select: { title: true } },
                Hobby: { select: { title: true } },
                Married_goal: { select: { title: true } },
                Life_goal: { select: { title: true } },
            },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            take: limit,
        });
        return suggestions;
        // return `This action returns a #${id} candidate`;
    }
    findLike(id: string) {
        return `This action returns a #${id} candidate`;
    }
}
