import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamilyMembersService } from './family_members.service';
import { CreateFamilyMemberDto } from './dto/create-family_member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family_member.dto';

@Controller('family-members')
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  @Post()
  create(@Body() createFamilyMemberDto: CreateFamilyMemberDto) {
    return this.familyMembersService.create(createFamilyMemberDto);
  }

  @Get()
  findAll() {
    return this.familyMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyMemberDto: UpdateFamilyMemberDto) {
    return this.familyMembersService.update(+id, updateFamilyMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyMembersService.remove(+id);
  }
}
