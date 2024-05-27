import { Controller, Post, Body, Patch, Param, Request } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';

@Controller('nadhar')
export class NadharController {
    constructor(private readonly nadharService: NadharService) {}

    @Post()
    async create(@Request() req: any, @Body() data: CreateNadharDto) {
        const userId = req.user.id;
        return this.nadharService.create(data, userId);
    }

    @Patch(':id')
    updateDate(@Param('id') id: string, @Body() data: UpdateNadharDto) {
        return this.nadharService.updateDate(id, data);
    }

    @Patch(':id')
    cancel(@Param('id') id: string, @Body() data: UpdateNadharDto) {
        return this.nadharService.cancel(id, data);
    }

    @Patch(':id')
    approve(@Param('id') id: string, @Body() data: UpdateNadharDto) {
        return this.nadharService.approve(id, data);
    }

    @Patch(':id')
    reject(@Param('id') id: string, @Body() data: UpdateNadharDto) {
        return this.nadharService.reject(id, data);
    }
}
