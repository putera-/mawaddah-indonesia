import { Controller, Post, Body, Patch, Param, Request, Get } from '@nestjs/common';
import { KhitbahService } from './khitbah.service';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { ApiTags } from '@nestjs/swagger';
import { ApproveKhitbahDoc, CancelKhitbahDoc, CreateKhitbahDoc, GetAllKhitbahDoc, GetByIdKhitbahDoc, RejectKhitbahDoc, UpdateKhitbahDoc } from './khitbah.doc';

@ApiTags('Khitbah')
@Controller('khitbah')
export class KhitbahController {
    constructor(private readonly khitbahService: KhitbahService) { }

    @GetAllKhitbahDoc()
    @Get('requests')
    async getAll(@Request() req: any) {
        const userId = req.user.id;
        try {
            return this.khitbahService.getAll(userId);
        } catch (error) {
            console.log(error);
        }
    }

    @GetByIdKhitbahDoc()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return this.khitbahService.findOne(id);
        } catch (error) {
            console.log(error);
        }
    }

    @CreateKhitbahDoc()
    @Roles(Role.Member)
    @Post(':taarufid')
    async create(@Request() req: any, @Param('taarufid') taarufId: string, @Body() data: CreateKhitbahDto) {
        const userId = req.user.id;
        try {
            return this.khitbahService.create(data, userId, taarufId);

        } catch (error) {
            console.log(error);
        }
    }

    @UpdateKhitbahDoc()
    @Roles(Role.Member)
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateKhitbahDto) {
        try {
            return this.khitbahService.update(id, data);

        } catch (error) {
            console.log(error);
        }
    }

    @CancelKhitbahDoc()
    @Roles(Role.Member)
    @Patch('cancel/:id')
    cancel(@Param('id') id: string) {
        try {
            return this.khitbahService.cancel(id);

        } catch (error) {
            console.log(error);
        }
    }

    @ApproveKhitbahDoc()
    @Roles(Role.Member)
    @Patch('approve/:id')
    approve(@Param('id') id: string) {
        try {
            return this.khitbahService.approve(id);

        } catch (error) {
            console.log(error);
        }
    }

    @RejectKhitbahDoc()
    @Roles(Role.Member)
    @Patch('reject/:id')
    reject(@Param('id') id: string) {
        try {
            return this.khitbahService.reject(id);

        } catch (error) {
            console.log(error);
        }
    }
}
