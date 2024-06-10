import { Controller, Post, Body, Patch, Param, Request, Get } from '@nestjs/common';
import { NadharService } from './nadhar.service';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';
import { Nadhar } from './nadhar.interface';

@Controller('nadhar')
export class NadharController {
    constructor(private readonly nadharService: NadharService) { }

    //  @Get()
    //  async getAll(@Request() req: any) {
    //      const userId = req.user.id;
    //      return this.nadharService.getAll(userId);
    //  }

    //  @Get('requests')
    //  async getAllRequests(@Request() req: any) {
    //      const userId = req.user.id;
    //      return this.nadharService.getAllRequests();
    //  }

    @Post(':taarufid')
    async create(@Request() req: any, @Param('taarufid') taarufId: string, @Body() data: CreateNadharDto) {
        const userId = req.user.id;
        try {
            return this.nadharService.create(data, userId, taarufId);

        } catch (error) {
            console.log(error);
        }
    }

    @Patch(':taarufid')
    updateDate(@Param('taarufid') taarufId: string, @Body() data: UpdateNadharDto) {
        return this.nadharService.updateDate(taarufId, data);
    }

    @Patch('cancel/:taarufid')
    cancel(@Param('taarufid') taarufid: string) {
        return this.nadharService.cancel(taarufid);
    }

    @Patch('approve/:taarufid')
    approve(@Param('taarufid') taarufid: string) {
        return this.nadharService.approve(taarufid);
    }

    @Patch('reject/:taarufid')
    reject(@Param('taarufid') taarufid: string) {
        return this.nadharService.reject(taarufid);
    }
}
