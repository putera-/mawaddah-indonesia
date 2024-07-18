import { Injectable, NotFoundException } from '@nestjs/common';
import { Biodata } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/user.service';

const select = {
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

const includeBiodata = {
    physical_characters: true,
    non_physical_characters: true,
    marriage_preparations: true,
    family_members: true,
    life_goals: true,
    ibadah: true,
    physical_criteria: true,
    non_physical_criteria: true,
};

@Injectable()
export class CandidateService {
    constructor(
        private Prisma: PrismaService,
        private User: UsersService,
    ) {}

    // TODO
    // buang limit & skip
    // where tambahakan, 30 hari terakhir
    async findNew(
        gender: any,
        page: number = 1,
        limit: number = 0,
    ): Promise<Pagination<User[]>> {
        // const skip = (page - 1) * limit;

        const oppositeGender = this.getOppositeGender(gender);
        const newUsers = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    id: { not: undefined },
                    gender: oppositeGender,
                    // where the biodata is created less than 30 days
                    createdAt: {
                        gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            include: {
                biodata: {
                    include: includeBiodata,
                },
                Education: true,
                Skill: true,
                Hobby: true,
                Married_goal: true,
                auth: {
                    select: { createdAt: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            // take: limit,
            // skip,
        });

        return {
            data: newUsers,
            total: 0,
            page: page,
            maxPages: 1,
            limit: newUsers.length,
        };
    }

    // async findAll(gender: string) {
    //     const oppositeGender = this.getOppositeGender(gender);
    //     return await this.Prisma.biodata.findMany({
    //         select: { ...select },
    //         where: { gender: oppositeGender },
    //     });
    // }

    async findOne(id: string) {
        const user = await this.Prisma.user.findFirst({
            where: {
                id,
            },
            include: {
                biodata: {
                    include: includeBiodata,
                },
                Education: true,
                Skill: true,
                Hobby: true,
                Married_goal: true,
                auth: {
                    select: { createdAt: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
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

    async getSimiliar2(
        userId: string,
        userBiodata: Biodata,
        minScore = 15,
        maxScore = 100,
    ): Promise<Pagination<User[]>> {
        const oppositeGender = this.getOppositeGender(userBiodata.gender);
        const candidates = await this.Prisma.user.findMany({
            where: {
                id: { not: userId },
                biodata: {
                    gender: oppositeGender,
                },
            },
            include: {
                biodata: {
                    include: includeBiodata,
                },
                Education: true,
                Skill: { select: { title: true } },
                Hobby: { select: { title: true } },
                Married_goal: { select: { title: true } },
                auth: {
                    select: { createdAt: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });

        const similarityScore = candidates
            .map((can) => ({
                can,
                score: this.calculateSimilarity(userBiodata, can.biodata),
            }))
            .sort((a, b) => b.score - a.score);

        // check if score range is empty
        const highest_score = similarityScore.length
            ? similarityScore[0].score
            : 0;
        if (highest_score <= minScore) {
            maxScore = highest_score;
            minScore = highest_score - 5;

            // force min score 1 if min score is below 0
            if (minScore <= 0) minScore = 1;
        }

        const suggestions = similarityScore
            .filter((c) => c.score <= maxScore && c.score >= minScore)
            .map((u) => {
                this.User.formatGray(u.can);
                return u.can;
            });

        return {
            data: suggestions,
            total: suggestions.length,
            page: 1,
            maxPages: 1,
            limit: suggestions.length,
        };
    }

    // TODO update similiarity
    calculateSimilarity(userBiodata: Biodata, candidateBiodata: Biodata) {
        let score = 0;
        if (userBiodata.manhaj == candidateBiodata.manhaj) score += 15;
        // town address
        if (userBiodata.address_town == candidateBiodata.address_town)
            score += 15;
        // province address
        if (userBiodata.address_province == candidateBiodata.address_province)
            score += 5;
        // province hometown
        if (userBiodata.hometown_province == candidateBiodata.hometown_province)
            score += 10;
        // user ethnic
        if (userBiodata.ethnic == candidateBiodata.ethnic) score += 10;
        // user zipcore address
        if (userBiodata.address_zip_code == candidateBiodata.address_zip_code)
            score += 5;
        if (userBiodata.poligami_opinion == candidateBiodata.poligami_opinion)
            score += 15;
        return score;
    }

    async findSuggestion(
        gender: any,
        page: number = 1,
        limit: number = 10,
    ): Promise<Pagination<User[]>> {
        const skip = (page - 1) * limit;

        const oppositeGender = this.getOppositeGender(gender);
        const suggestions = await this.Prisma.user.findMany({
            where: {
                biodata: {
                    gender: oppositeGender,
                },
            },
            select: {
                ...select,
                Skill: { select: { title: true } },
                Hobby: { select: { title: true } },
                Married_goal: { select: { title: true } },
                biodata: {
                    include: includeBiodata,
                },
            },
            orderBy: {
                biodata: {
                    createdAt: 'desc',
                },
            },
            take: limit,
            skip,
        });
        return {
            data: suggestions,
            total: 0,
            page: page,
            maxPages: Math.ceil(0 / limit),
            limit: +limit,
        };
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
                ...select,
                Skill: { select: { title: true } },
                Hobby: { select: { title: true } },
                Married_goal: { select: { title: true } },
                biodata: {
                    include: {
                        physical_characters: true,
                        non_physical_characters: true,
                    },
                },
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

    // getSimiliar(user: any, suggest: Record<string, any>[]) {
    //     for (const data of suggest) {
    //         const s: Record<string, any> = data;
    //         s.similiarSkills = s.Skill.filter((cand) =>
    //             user.Skill.some(
    //                 (selectedSkill) => selectedSkill.title === cand.title,
    //             ),
    //         );
    //         s.similiarHobbies = s.Hobby.filter((cand) =>
    //             user.Hobby.some(
    //                 (selectedHobbies) => selectedHobbies.title === cand.title,
    //             ),
    //         );
    //         s.similiarMarriageGoals = s.Married_goal.filter((cand) =>
    //             user.Married_goal.some(
    //                 (selectedMarriage) => selectedMarriage.title === cand.title,
    //             ),
    //         );
    //         s.similiarLifeGoals = s.Life_goal.filter((cand) =>
    //             user.Life_goal.some(
    //                 (selectedLife) => selectedLife.title === cand.title,
    //             ),
    //         );
    //         delete s.password;
    //         delete s.Skill;
    //         delete s.Hobby;
    //         delete s.Married_goal;
    //         delete s.Life_goal;
    //         s.similiarity =
    //             s.similiarSkills.length +
    //             s.similiarHobbies.length +
    //             s.similiarMarriageGoals.length +
    //             s.similiarLifeGoals.length;
    //     }
    //     return suggest;
    // }
}
