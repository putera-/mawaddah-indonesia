import { Controller, Post, Body, Patch, Param, Request, Get } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { Nadhar } from './nadhar.interface';

@Controller('nadhar')
export class NadharController {
    constructor(private readonly nadharService: NadharService) { }


    @Post(':taarufid')
    async create(@Request() req: any, @Param('id') taarufId: string, @Body() data: CreateNadharDto) {
        const userId = req.user.id;
        try {
            return this.nadharService.create(data, userId, taarufId);

        } catch (error) {
            console.log(error);
        }
    }

    @Patch(':taarufid')
    updateDate(@Param('id') taarufId: string, @Body() data: UpdateNadharDto) {
        return this.nadharService.updateDate(taarufId, data);
    }

    @Patch('cancel/:taarufid')
    cancel(@Param('id') id: string) {
        return this.nadharService.cancel(id);
    }

    @Patch('approve/:taarufid')
    approve(@Param('id') id: string) {
        return this.nadharService.approve(id);
    }

    @Patch('reject/:taarufid')
    reject(@Param('id') id: string) {
        return this.nadharService.reject(id);
    }
}
