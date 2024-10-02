import { Controller, Post, Body, Patch, Param, Request, Get } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { Nadhar } from './nadhar.interface';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { ApproveNadharDoc, CancelNadharDoc, CreateNadharDoc, GetAllNadharDoc, GetByIdNadharDoc, RejectNadharDoc, UpdateNadharDoc } from './nadhar.doc';

@Controller('nadhar')
export class NadharController {
    constructor(private readonly nadharService: NadharService) { }

    @GetAllNadharDoc()
    @Get()
    async getAll(@Request() req: any) {
        const userId = req.user.id;
        try {
            return this.nadharService.getAll(userId);
        } catch (error) {
            console.log(error);
        }
    }

    @GetByIdNadharDoc()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return this.nadharService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @CreateNadharDoc()
    @Roles(Role.Member
    )
    @Post(':taarufid')
    async create(@Request() req: any, @Param('taarufid') taarufId: string, @Body() data: CreateNadharDto): Promise<Nadhar> {
        const userId = req.user.id;
        try {
            return this.nadharService.create(data, userId, taarufId);

        } catch (error) {
            throw error;
        }
    }

    @UpdateNadharDoc()
    @Roles(Role.Member)
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateNadharDto): Promise<Nadhar> {
        try {
            return this.nadharService.update(id, data);
        } catch (error) {
            throw error;
        }
    }

    @CancelNadharDoc()
    @Roles(Role.Member)
    @Patch('cancel/:id')
    cancel(@Param('id') id: string): Promise<Nadhar> {
        try {
            return this.nadharService.cancel(id);
        } catch (error) {
            throw error;
        }
    }

    @ApproveNadharDoc()
    @Roles(Role.Member)
    @Patch('approve/:id')
    approve(@Param('id') id: string): Promise<Nadhar> {
        try {
            return this.nadharService.approve(id);
        } catch (error) {
            throw error;
        }
    }

    @RejectNadharDoc()
    @Roles(Role.Member)
    @Patch('reject/:id')
    reject(@Param('id') id: string): Promise<Nadhar> {
        try {
            return this.nadharService.reject(id);
        } catch (error) {
            throw error;
        }
    }
}
