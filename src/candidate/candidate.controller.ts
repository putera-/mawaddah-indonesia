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

@Controller('candidate')
export class CandidateController {
    constructor(
        private readonly candidateService: CandidateService,
        private readonly userService: UsersService,
        private Prisma: PrismaService,
        private readonly biodataService: BiodataService,
    ) {}

    @Roles(Role.Member)
    @Get('new')
    async findNew(
        @Request() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
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
                +limit || 0,
            );
            for (const c of candidate.data) {
                this.userService.formatGray(c);
            }

            return candidate;
        } catch (error) {
            throw error;
        }
    }
    // @Roles(Role.Member)
    // @Get('all')
    // async findAll(@Request() req: any) {
    //     try {
    //         const user = await this.biodataService.findMe(req.user.id);
    //         return await this.candidateService.findAll(user.gender);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    @Roles(Role.Member)
    @Get('suggestion')
    async findSuggestion2(
        @Request() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        try {
            const userBiodata = await this.biodataService.findMe(req.user.id);

            return await this.candidateService.getSimiliar2(
                req.user.id,
                userBiodata,
            );
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get('you-may-like')
    async findLike2(
        @Request() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        try {
            const userBiodata = await this.biodataService.findMe(req.user.id);

            return await this.candidateService.getSimiliar2(
                req.user.id,
                userBiodata,
                1,
                14,
            );
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.candidateService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    // @Roles(Role.Member)
    // @Get('suggestion_old')
    // async findSuggestion(
    //     @Request() req: any,
    //     @Query('page') page: string,
    //     @Query('limit') limit: string,
    // ) {
    //     try {
    //         const bio = await this.Prisma.biodata.findFirst({
    //             where: {
    //                 userId: req.user.id,
    //             },
    //         });
    //         const user = await this.Prisma.user.findFirst({
    //             where: { id: req.user.id },
    //             select: {
    //                 Skill: { select: { title: true } },
    //                 Hobby: { select: { title: true } },
    //                 Married_goal: { select: { title: true } },
    //             },
    //         });
    //         const suggest = await this.candidateService.findSuggestion(
    //             bio.gender,
    //             +page || 1,
    //             +limit || 10,
    //         );

    //         // gray name
    //         for (const c of suggest.data) {
    //             this.userService.formatGray(c);
    //         }

    //         const result = this.candidateService.getSimiliar(user, suggest.data);
    //         suggest.data = result.sort((a, b) => b.similiarity - a.similiarity) as User[];

    //         return suggest;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // @Roles(Role.Member)
    // @Get('you-may-like-old')
    // async findLike(
    //     @Request() req: any,
    //     @Query('page') page: string,
    //     @Query('limit') limit: string,
    // ) {
    //     try {
    //         const bio = await this.Prisma.biodata.findFirst({
    //             where: {
    //                 userId: req.user.id,
    //             },
    //         });
    //         if (!bio)
    //             throw new NotFoundException(
    //                 'Silakan isi biodata terlebih dahulu',
    //             );
    //         const user = await this.Prisma.user.findFirst({
    //             where: { id: req.user.id },
    //             select: {
    //                 Skill: { select: { title: true } },
    //                 Hobby: { select: { title: true } },
    //                 Married_goal: { select: { title: true } },
    //             },
    //         });

    //         const mayLike = await this.candidateService.findSuggestion(
    //             bio.gender,
    //             +page || 1,
    //             +limit || 10,
    //         );
    //         // gray name
    //         for (const c of mayLike.data) {
    //             this.userService.formatGray(c);
    //         }

    //         const result = this.candidateService.getSimiliar(user, mayLike.data);
    //         mayLike.data = result.sort((a, b) => b.similiarity - a.similiarity) as User[];

    //         return mayLike;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
