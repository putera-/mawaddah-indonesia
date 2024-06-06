import { Controller, Get, Post, Body, Patch, Param, Request } from '@nestjs/common';
import { AkadService } from './akad.service';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';

@Controller('akad')
export class AkadController {
  constructor(private readonly akadService: AkadService) { }

  @Post(':taarufid')
  async create(@Request() req: any, @Param('taarufid') taarufId: string, @Body() data: CreateAkadDto) {
    const userId = req.user.id;
    try {
      return this.akadService.create(data, userId, taarufId);

    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':taarufid')
  updateDate(@Param('taarufid') taarufId: string, @Body() data: UpdateAkadDto) {
    return this.akadService.updateDate(taarufId, data);
  }

  @Patch('cancel/:taarufid')
  cancel(@Param('taarufid') id: string) {
    return this.akadService.cancel(id);
  }

  @Patch('approve/:taarufid')
  approve(@Param('taarufid') id: string) {
    return this.akadService.approve(id);
  }

  @Patch('reject/:taarufid')
  reject(@Param('taarufid') id: string) {
    return this.akadService.reject(id);
  }
}
