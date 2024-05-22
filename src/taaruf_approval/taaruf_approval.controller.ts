import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaarufApprovalService } from './taaruf_approval.service';
import { CreateTaarufApprovalDto } from './dto/create-taaruf_approval.dto';
import { UpdateTaarufApprovalDto } from './dto/update-taaruf_approval.dto';

@Controller('taaruf-approval')
export class TaarufApprovalController {
  constructor(private readonly taarufApprovalService: TaarufApprovalService) {}

  @Post()
  create(@Body() createTaarufApprovalDto: CreateTaarufApprovalDto) {
    return this.taarufApprovalService.create(createTaarufApprovalDto);
  }

  @Get()
  findAll() {
    return this.taarufApprovalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taarufApprovalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaarufApprovalDto: UpdateTaarufApprovalDto) {
    return this.taarufApprovalService.update(+id, updateTaarufApprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taarufApprovalService.remove(+id);
  }
}
