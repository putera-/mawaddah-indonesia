import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Request,
} from '@nestjs/common';
import { AkadService } from './akad.service';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAkadDoc, UpdateAkadDoc } from './akad.doc';

/**
TODO
FIXME
- TRY CATCH ERROR
- ROLE GUARD
- CEK TAARUF ID RELATION
**/

@ApiTags('Akad')
@ApiBearerAuth()
@Controller('akad')
export class AkadController {
    constructor(private readonly akadService: AkadService) { }

    @CreateAkadDoc()
    @Roles(Role.Member)
    @Post(':taarufid')
    async create(
        @Request() req: any,
        @Param('taarufid') taarufId: string,
        @Body() data: CreateAkadDto,
    ) {
        // TODO cek bug taaruf id tidak ditemukan padahal ada
        const userId = req.user.id;
        try {
            return this.akadService.create(data, userId, taarufId);
        } catch (error) {
            console.log(error);
        }
    }

    // TODO use akad id for patching
    @UpdateAkadDoc()
    @Roles(Role.Member)
    @Patch(':taarufid')
    updateDate(
        @Param('taarufid') taarufId: string,
        @Body() data: UpdateAkadDto,
    ) {
        return this.akadService.updateDate(taarufId, data);
    }

    @Roles(Role.Member)
    @Patch('cancel/:taarufid')
    cancel(@Param('taarufid') taarufid: string) {
        return this.akadService.cancel(taarufid);
    }

    @Roles(Role.Member)
    @Patch('approve/:taarufid')
    approve(@Param('taarufid') taarufid: string) {
        return this.akadService.approve(taarufid);
    }

    @Roles(Role.Member)
    @Patch('reject/:taarufid')
    reject(@Param('taarufid') taarufid: string) {
        return this.akadService.reject(taarufid);
    }

    // TODO create get all akad and get akad by id
}
