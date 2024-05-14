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
    constructor(private Prisma: PrismaService) { }
    async findNew(gender: any, page = '1', limit = '10') {
        const oppositeGender = this.getOppositeGender(gender);
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
            take: Number(limit),
        });
        return newUsers;
    }
    findAll(gender: string) {
        const oppositeGender = this.getOppositeGender(gender);
        return this.Prisma.biodata.findMany({
            select: { ...select },
            where: { gender: oppositeGender },
        });
    }
    findOne(id: string) {
        return this.Prisma.user.findFirst({
            where: {
                id,
            },
            select: { ...select },
        });
    }
    getOppositeGender(gender: any) {
        let oppositeGender: any;
        if (gender === 'PRIA') oppositeGender = 'WANITA';
        else if (gender === 'WANITA') oppositeGender = 'PRIA';
        return oppositeGender;
    }
    getSimiliar(user: any, suggest: Record<string, any>[]) {
        for (const data of suggest) {
            const s: Record<string, any> = data;
            s.similiarSkills = s.Skill.filter((cand) =>
                user.Skill.some(
                    (selectedSkill) => selectedSkill.title === cand.title,
                ),
            );
            s.similiarHobbies = s.Hobby.filter((cand) =>
                user.Hobby.some(
                    (selectedHobbies) => selectedHobbies.title === cand.title,
                ),
            );
            s.similiarMarriageGoals = s.Married_goal.filter((cand) =>
                user.Married_goal.some(
                    (selectedMarriage) => selectedMarriage.title === cand.title,
                ),
            );
            s.similiarLifeGoals = s.Life_goal.filter((cand) =>
                user.Life_goal.some(
                    (selectedLife) => selectedLife.title === cand.title,
                ),
            );
            delete s.password;
            delete s.Skill;
            delete s.Hobby;
            delete s.Married_goal;
            delete s.Life_goal;
            s.similiarity =
                s.similiarSkills.length +
                s.similiarHobbies.length +
                s.similiarMarriageGoals.length +
                s.similiarLifeGoals.length;
        }
        return suggest;
    }
    async findSuggestion(gender: any, page = '1', limit = '10') {
        const oppositeGender = this.getOppositeGender(gender);
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
                biodata: true,
            },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            take: Number(limit),
        });
        return suggestions;
        // return `This action returns a #${id} candidate`;
    }
    findLike(id: string) {
        return `This action returns a #${id} candidate`;
    }
}
