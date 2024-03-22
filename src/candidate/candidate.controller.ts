import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Query,
    Request,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { UsersService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma.service';

@Controller('candidate')
export class CandidateController {
    constructor(
        private readonly candidateService: CandidateService,
        private readonly userService: UsersService,
        private Prisma: PrismaService,
    ) {}

    @Roles(Role.Member)
    @Get('new')
    async findNew(@Request() req: any, @Query() query: Record<string, any>) {
        try {
            const user = await this.Prisma.biodata.findFirst({
                where: {
                    userId: req.user.id,
                },
            });
            if (!user) throw new NotFoundException('Silakan lengkapi biodata');
            const candidate = await this.candidateService.findNew(
                user.gender,
                query,
            );
            for (const c of candidate) {
                this.userService.formatGray(c);
            }

            return candidate;
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Member)
    @Get('suggestion')
    async findSuggestion(
        @Request() req: any,
        @Query() query: Record<string, any>,
    ) {
        try {
            const bio = await this.Prisma.biodata.findFirst({
                where: {
                    userId: req.user.id,
                },
            });
            const user = await this.Prisma.user.findFirst({
                where: { id: req.user.id },
                select: {
                    Skill: { select: { title: true } },
                    Hobby: { select: { title: true } },
                    Married_goal: { select: { title: true } },
                    Life_goal: { select: { title: true } },
                },
            });
            const suggest = await this.candidateService.findSuggestion(
                bio.gender,
                query,
            );

            for (const data of suggest) {
                const { password, ...s } = data;
                const filteredSkills = s.Skill.filter((cand) =>
                    user.Skill.some(
                        (selectedSkill) => selectedSkill.title === cand.title,
                    ),
                );
                const filteredHobbies = s.Hobby.filter((cand) =>
                    user.Hobby.some(
                        (selectedHobbies) =>
                            selectedHobbies.title === cand.title,
                    ),
                );
                const filteredMarriage = s.Married_goal.filter((cand) =>
                    user.Married_goal.some(
                        (selectedMarriage) =>
                            selectedMarriage.title === cand.title,
                    ),
                );
                const filteredLife = s.Life_goal.filter((cand) =>
                    user.Life_goal.some(
                        (selectedLife) => selectedLife.title === cand.title,
                    ),
                );
                console.log('skills');
                console.log(filteredSkills);
                console.log('hobbies');
                console.log(filteredHobbies);
                console.log('marriage');
                console.log(filteredMarriage);
                console.log('life');
                console.log(filteredLife);
            }
            return;
            if (!bio) throw new NotFoundException('Silakan lengkapi biodata');
            return;
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Member)
    @Get('you_may_like')
    findLike(@Param('id') id: string) {
        return this.candidateService.findLike(id);
    }
}
