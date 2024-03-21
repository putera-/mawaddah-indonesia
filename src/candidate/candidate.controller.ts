import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
// import { UsersService } from 'src/users/user.service';

@Controller('candidate')
export class CandidateController {
    constructor(private readonly candidateService: CandidateService) {}

    @Roles(Role.Member)
    @Get('new')
    findNew(@Query() query: Record<string, any>) {
        return this.candidateService.findNew(query);
    }
    @Roles(Role.Member)
    @Get('suggestion')
    findSuggestion(@Param('id') id: string) {
        return this.candidateService.findSuggestion(id);
    }
    @Roles(Role.Member)
    @Get('you_may_like')
    findLike(@Param('id') id: string) {
        return this.candidateService.findLike(id);
    }
}
