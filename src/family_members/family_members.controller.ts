import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode } from '@nestjs/common';
import { FamilyMembersService } from './family_members.service';
import { CreateFamilyMemberDto } from './dto/create-family_member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family_member.dto';

@Controller('family-members')
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) { }

  @Post()
  create(@Request() req: any, @Body() data: CreateFamilyMemberDto) {
    const userId = req.user.id

    return this.familyMembersService.create(data, userId);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.id

    return this.familyMembersService.findAll(userId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id

    return this.familyMembersService.findOne(id, userId);
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Request() req: any, @Param('id') id: string, @Body() data: UpdateFamilyMemberDto) {
    const userId = req.user.id

    return this.familyMembersService.update(id, data, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id

    return this.familyMembersService.remove(id, userId);
  }
}
