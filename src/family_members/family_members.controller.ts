import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    HttpCode,
} from '@nestjs/common';
import { FamilyMembersService } from './family_members.service';
import { CreateFamilyMemberDto } from './dto/create-family_member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family_member.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateFamilyMemberDoc,
    DeleteFamilyMemberDoc,
    GetFamilyMemberByIdDoc,
    UpdateFamilyMemberDoc,
} from './family_member.doc';
// import { GetAllActivationDoc } from 'src/activation/activation.doc';

@ApiTags('Family Members')
@ApiBearerAuth()
@Controller('family-members')
export class FamilyMembersController {
    constructor(private readonly familyMembersService: FamilyMembersService) { }

    @CreateFamilyMemberDoc()
    @Roles(Role.Member)
    @Post()
    create(@Request() req: any, @Body() data: CreateFamilyMemberDto) {
        const userId = req.user.id;

        return this.familyMembersService.create(data, userId);
    }

    // FIXME
    // @GetAllActivationDoc()
    @Roles(Role.Member)
    @Get()
    findAll(@Request() req: any) {
        const userId = req.user.id;

        return this.familyMembersService.findAll(userId);
    }

    @GetFamilyMemberByIdDoc()
    @Roles(Role.Member)
    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id;

        return this.familyMembersService.findOne(id, userId);
    }

    @UpdateFamilyMemberDoc()
    @Roles(Role.Member)
    @Patch(':id')
    update(
        @Request() req: any,
        @Param('id') id: string,
        @Body() data: UpdateFamilyMemberDto,
    ) {
        const userId = req.user.id;

        return this.familyMembersService.update(id, data, userId);
    }

    @DeleteFamilyMemberDoc()
    @Roles(Role.Member)
    @Delete(':id')
    @HttpCode(204)
    remove(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id;

        return this.familyMembersService.remove(id, userId);
    }
}
