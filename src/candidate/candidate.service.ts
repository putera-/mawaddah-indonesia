import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
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
const hiddenSelect = {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    active: true,
    verified: true,
    blurred_avatar: true,
    blurred_avatar_md: true,
    role: true,
    taaruf_status: true,
    createdAt: true,
};
@Injectable()
export class CandidateService {
    constructor(
        private Prisma: PrismaService,
        private User: UsersService,
    ) { }
    async findNew(gender: any, page = '1', limit = '10') {
        const oppositeGender = this.getOppositeGender(gender);
        const newUsers = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    id: { not: undefined },
                    gender: oppositeGender,
                },
            },
            select: { ...hiddenSelect, biodata: true },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            take: Number(limit),
        });
        return newUsers;
    }
    async findAll(gender: string) {
        const oppositeGender = this.getOppositeGender(gender);
        return await this.Prisma.biodata.findMany({
            select: { ...hiddenSelect },
            where: { gender: oppositeGender },
        });
    }
    async findOne(id: string) {
        const user = await this.Prisma.user.findFirst({
            where: {
                id,
            },
            include: {
                biodata: true,
                Physic_character: true,
                Education: true,
                Skill: true,
                Hobby: true,
                Married_goal: true,
                Life_goal: true,
            }
        });
        if (!user) throw new NotFoundException('User tidak ditemukan');
        this.User.formatGray(user);
        return user;
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
            select: {
                ...hiddenSelect,
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
    async findLike(gender: any, page = '3', limit = '10') {
        const oppositeGender = this.getOppositeGender(gender);
        const numberSkip = +page - 1;
        const skip = +limit * numberSkip;
        const mayLike = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    gender: oppositeGender,
                },
            },
            select: {
                ...hiddenSelect,
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
            skip,
        });
        return mayLike;
        // return `This action returns a #${id} candidate`;
    }
}
