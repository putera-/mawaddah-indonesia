import { Controller, Post, Body, Patch, Param, Request, Get } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { Nadhar } from './nadhar.interface';

@Controller('nadhar')
export class NadharController {
    constructor(private readonly nadharService: NadharService) { }

    // TODO ini buang aja, karena ga ada di api doc
    @Get()
    async getAll(@Request() req: any) {
        const userId = req.user.id;
        return this.nadharService.getAll(userId);
    }

    // TODO ini buang aja, karena ga ada di api doc
    @Get('requests')
    async getAllRequests(@Request() req: any) {
        const userId = req.user.id;
        return this.nadharService.getAllRequests();
    }

    // FIXME keynya ganti :taarufid, supaya ga rancu
    @Post(':id')
    async create(@Request() req: any, @Param('id') taarufId: string, @Body() data: CreateNadharDto) {
        const userId = req.user.id;
        try {
            return this.nadharService.create(data, userId, taarufId);

        } catch (error) {
            console.log(error);
        }
    }

    // FIXME keynya ganti :taarufid, supaya ga rancu
    @Patch(':id')
    updateDate(@Param('id') taarufId: string, @Body() data: UpdateNadharDto) {
        return this.nadharService.updateDate(taarufId, data);
    }

    // FIXME keynya ganti :taarufid, supaya ga rancu
    @Patch('cancel/:id')
    cancel(@Param('id') id: string) {
        return this.nadharService.cancel(id);
    }

    // FIXME keynya ganti :taarufid, supaya ga rancu
    @Patch('approve/:id')
    approve(@Param('id') id: string) {
        return this.nadharService.approve(id);
    }

    // FIXME keynya ganti :taarufid, supaya ga rancu
    @Patch('reject/:id')
    reject(@Param('id') id: string) {
        return this.nadharService.reject(id);
    }
}
