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
import { BiodataService } from 'src/biodata/biodata.service';
import { User } from 'src/users/user.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CandidateGetOneDoc, CandidateSuggestionDoc, CandidateYouMayLikeDoc, GetNewCandidateDoc } from './candidate.doc';

@ApiTags('Candidates')
@ApiBearerAuth()
@Controller('candidate')
export class CandidateController {
    constructor(
        private readonly candidateService: CandidateService,
        private readonly userService: UsersService,
        private Prisma: PrismaService,
        private readonly biodataService: BiodataService,
    ) { }

    @Roles(Role.Member)
    @Get('new')
    @GetNewCandidateDoc()
    async findNew(
        @Request() req: any,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        try {
            const user = await this.Prisma.biodata.findFirst({
                where: {
                    userId: req.user.id,
                },
            });
            if (!user) throw new NotFoundException('Silakan lengkapi biodata');
            const candidate = await this.candidateService.findNew(
                user.gender,
                +page || 1,
                +limit || 20,
            );
            for (const c of candidate.data) {
                this.userService.formatGray(c);
            }

            return candidate;
        } catch (error) {
            throw error;
        }
    }

    @CandidateSuggestionDoc()
    @Roles(Role.Member)
    @Get('suggestion')
    async findSuggestion(
        @Request() req: any,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        try {
            const userBiodata = await this.biodataService.findMe(req.user.id);

            return await this.candidateService.getSimiliar(
                req.user.id,
                userBiodata,
                +page || 1,
                +limit || 20,
            );
        } catch (error) {
            throw error;
        }
    }

    @CandidateYouMayLikeDoc()
    @Roles(Role.Member)
    @Get('you-may-like')
    async findLike(
        @Request() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        try {
            const userBiodata = await this.biodataService.findMe(req.user.id);

            return await this.candidateService.getSimiliar(
                req.user.id,
                userBiodata,
                +page || 1,
                +limit || 20,
                1,
                14,
            );
        } catch (error) {
            throw error;
        }
    }

    @CandidateGetOneDoc()
    @Roles(Role.Member)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.candidateService.findOne(id);
        } catch (error) {
            throw error;
        }
    }
}
