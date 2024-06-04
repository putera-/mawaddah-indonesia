import { Controller, Get, Post, Body, Patch, Param, Request } from '@nestjs/common';
import { AkadService } from './akad.service';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';

@Controller('akad')
export class AkadController {
  constructor(private readonly akadService: AkadService) { }

  @Get()
  async getAll(@Request() req: any) {
    const userId = req.user.id;
    return this.akadService.getAll(userId);
  }


  @Get('requests')
  async getAllRequests(@Request() req: any) {
    const userId = req.user.id;
    return this.akadService.getAllRequests();
  }

  @Post(':id')
  async create(@Request() req: any, @Param('id') taarufId: string, @Body() data: CreateAkadDto) {
    const userId = req.user.id;
    try {
      return this.akadService.create(data, userId, taarufId);

    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  updateDate(@Param('id') taarufId: string, @Body() data: UpdateAkadDto) {
    return this.akadService.updateDate(taarufId, data);
  }

  @Patch('cancel/:id')
  cancel(@Param('id') id: string) {
    return this.akadService.cancel(id);
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.akadService.approve(id);
  }

  @Patch('reject/:id')
  reject(@Param('id') id: string) {
    return this.akadService.reject(id);
  }
}
