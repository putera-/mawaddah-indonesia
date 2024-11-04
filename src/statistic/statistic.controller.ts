import {
    Controller,
    Get,
    // Post,
    // Body,
    // Patch,
    Param,
    // Delete,
    // Query,
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
    getByRelationshipDoc,
    getNewMemberDoc,
} from './statistic.doc';

@ApiTags('statistic')
@ApiBearerAuth()
@Controller('statistic')
export class StatisticController {
    constructor(private readonly statisticService: StatisticService) {}

    @getNewMemberDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('new-member')
    findNewMember() {
        return this.statisticService.findNewMember();
    }

    @getAllMemberDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get()
    findAllMember() {
        return this.statisticService.findAllMember();
    }

    @getActiveMemberDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('active-member/:max_days')
    findActiveMember(@Param('max_days') max_days: number) {
        return this.statisticService.findActiveMember(max_days);
    }

    @getByRelationshipDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Get('relationship/:process')
    findByRelationship(@Param('process') process: string) {
        return this.statisticService.findByRelationship(process);
    }
}
