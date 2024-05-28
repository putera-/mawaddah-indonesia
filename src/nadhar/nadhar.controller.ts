import { Controller, Post, Body, Patch, Param, Request, Get } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { Nadhar } from './nadhar.interface';
 
@Controller('nadhar')
export class NadharController {
    constructor(private readonly nadharService: NadharService) {}

    @Get()
    async getAll (@Request() req: any) {
        const userId = req.user.id;
        return this.nadharService.getAll(userId);
    }
    
    @Post(':id')
    async create(@Request() req: any,@Param('id') taarufId: string, @Body() data: Nadhar) {
        const userId = req.user.id;
        return this.nadharService.create(data, userId, taarufId);
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
