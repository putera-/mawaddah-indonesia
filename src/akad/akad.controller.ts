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

    //for maintainence only
    // @Get()
    // async getAll(@Request() req: any) {
    //     const userId = req.user.id;
    //     try {
    //         return this.akadService.getAll(userId);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    @CreateAkadDoc()
    @Roles(Role.Member)
    @Post(':taarufid')
    async create(
        @Request() req: any,
        @Param('taarufid') taarufId: string,
        @Body() data: CreateAkadDto,
    ) {
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
    @Patch(':id')
    update(

        @Param('id') id: string,
        @Body() data: UpdateAkadDto,) {
            try {
                return this.akadService.update(id, data);

            } catch (error) {
                console.log(error);
            }
    }

    @Roles(Role.Member)
    @Patch('cancel/:id')
    cancel(@Param('id') id: string) {
        try {
            return this.akadService.cancel(id);

        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @Patch('approve/:id')
    approve(@Param('id') id: string) {
        try {
            return this.akadService.approve(id);

        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @Patch('reject/:id')
    reject(@Param('id') id: string) {
        try {
            return this.akadService.reject(id);

        } catch (error) {
            console.log(error);
        }
    }

    // TODO create get all akad and get akad by id
}
