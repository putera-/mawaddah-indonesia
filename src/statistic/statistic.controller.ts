import {
    Controller,
    Get,
    // Post,
    // Body,
    // Patch,
    Param,
    Query,
    // Delete,
} from '@nestjs/common';
import { StatisticService } from './statistic.service';
// import { CreateStatisticDto } from './dto/create-statistic.dto';
// import { UpdateStatisticDto } from './dto/update-statistic.dto';
// import { Public } from 'src/auth/auth.metadata';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import {
    getActiveMemberDoc,
    getAllMemberDoc,
    getAllMemberStatDoc,
    getByDateDoc,
    getByRelationshipDoc,
    getNewMemberDoc,
} from './statistic.doc';

@ApiTags('statistic')
@ApiBearerAuth()
@Controller('statistic')
export class StatisticController {
    constructor(private readonly statisticService: StatisticService) {}

    @getAllMemberStatDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('all')
    async countAllMemberStats(
        @Query('range') range?: number,
        @Query('max_days') max_days?: number,
    ) {
        const [
            newMembers,
            activeMembersByDate,
            allMembers,
            activeMembers,
            byTaaruf,
            byNadhar,
            byKhitbah,
            byAkad,
        ] = await Promise.all([
            this.statisticService.findNewMember(),
            this.statisticService.findByDate(range || 30),
            this.statisticService.findAllMember(),
            this.statisticService.findActiveMember(max_days || 7),
            this.statisticService.findByRelationship('taaruf'),
            this.statisticService.findByRelationship('nadhar'),
            this.statisticService.findByRelationship('khitbah'),
            this.statisticService.findByRelationship('akad'),
        ]);

        return {
            newMembers,
            activeMembersByDate,
            allMembers,
            activeMembers,
            byTaaruf,
            byNadhar,
            byKhitbah,
            byAkad,
        };
    }

    @getNewMemberDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('new-member')
    countNewMember() {
        return this.statisticService.findNewMember();
    }

    @getAllMemberDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('all-member')
    countAllMember() {
        return this.statisticService.findAllMember();
    }

    @getByDateDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('by-date/:range')
    countByDate2(@Param('range') range: number) {
        return this.statisticService.findByDate(range);
    }

    @getActiveMemberDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('active-member/:max_days')
    countActiveMember(@Param('max_days') max_days: number) {
        return this.statisticService.findActiveMember(max_days);
    }

    @getByRelationshipDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('relationship/:process')
    countByRelationship(@Param('process') process: string) {
        return this.statisticService.findByRelationship(process);
    }
}
