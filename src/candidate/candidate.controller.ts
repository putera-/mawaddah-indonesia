import {
    Controller,
    Get,
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
        const user = await this.Prisma.biodata.findFirstOrThrow({
            where: {
                userId: req.user.id,
            },
        });
        const candidate = await this.candidateService.findNew(
            user.gender,
            query,
        );
        for (const c of candidate) {
            this.userService.formatGray(c);
        }

        return candidate;
    }
    @Roles(Role.Member)
    @Get('suggestion')
    findSuggestion(@Query() query: Record<string, any>) {
        return this.candidateService.findSuggestion(query);
    }
    @Roles(Role.Member)
    @Get('you_may_like')
    findLike(@Param('id') id: string) {
        return this.candidateService.findLike(id);
    }
}
