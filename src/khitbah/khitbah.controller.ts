import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { KhitbahService } from './khitbah.service';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';

@Controller('khitbah')
export class KhitbahController {
  constructor(private readonly khitbahService: KhitbahService) { }

  @Get()
  async getAll(@Request() req: any) {
    const userId = req.user.id;
    return this.khitbahService.getAll(userId);
  }


  @Get('requests')
  async getAllRequests(@Request() req: any) {
    const userId = req.user.id;
    return this.khitbahService.getAllRequests();
  }

  @Post(':id')
  async create(@Request() req: any, @Param('id') taarufId: string, @Body() data: CreateKhitbahDto) {
    const userId = req.user.id;
    try {
      return this.khitbahService.create(data, userId, taarufId);

    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  updateDate(@Param('id') taarufId: string, @Body() data: UpdateKhitbahDto) {
    return this.khitbahService.updateDate(taarufId, data);
  }

  @Patch('cancel/:id')
  cancel(@Param('id') id: string) {
    return this.khitbahService.cancel(id);
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.khitbahService.approve(id);
  }

  @Patch('reject/:id')
  reject(@Param('id') id: string) {
    return this.khitbahService.reject(id);
  }

}
