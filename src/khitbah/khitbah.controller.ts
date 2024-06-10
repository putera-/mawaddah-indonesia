import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { KhitbahService } from './khitbah.service';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';

@Controller('khitbah')
export class KhitbahController {
  constructor(private readonly khitbahService: KhitbahService) { }

  @Post(':taarufid')
  async create(@Request() req: any, @Param('taarufid') taarufId: string, @Body() data: CreateKhitbahDto) {
    const userId = req.user.id;
    try {
      return this.khitbahService.create(data, userId, taarufId);

    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':taarufid')
  updateDate(@Param('taarufid') taarufId: string, @Body() data: UpdateKhitbahDto) {
    return this.khitbahService.updateDate(taarufId, data);
  }

  @Patch('cancel/:taarufid')
  cancel(@Param('taarufid') taarufid: string) {
    return this.khitbahService.cancel(taarufid);
  }

  @Patch('approve/:taarufid')
  approve(@Param('taarufid') taarufid: string) {
    return this.khitbahService.approve(taarufid);
  }

  @Patch('reject/:taarufid')
  reject(@Param('taarufid') taarufid: string) {
    return this.khitbahService.reject(taarufid);
  }

}
