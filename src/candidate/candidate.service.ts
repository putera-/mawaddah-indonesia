import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CandidateService {
    constructor(private Prisma: PrismaService) {}
    async findNew(query: Record<string, any>) {
        const limit = parseInt(query.limit);
        const newUsers = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    id: { not: undefined },
                },
            },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            take: limit,
        });
        return newUsers;
    }

    findSuggestion(id: string) {
        return `This action returns a #${id} candidate`;
    }
    findLike(id: string) {
        return `This action returns a #${id} candidate`;
    }
}
