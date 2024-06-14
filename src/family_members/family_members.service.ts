import { Injectable } from '@nestjs/common';
import { CreateFamilyMemberDto } from './dto/create-family_member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family_member.dto';

@Injectable()
export class FamilyMembersService {
  create(createFamilyMemberDto: CreateFamilyMemberDto) {
    return 'This action adds a new familyMember';
  }

  findAll() {
    return `This action returns all familyMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familyMember`;
  }

  update(id: number, updateFamilyMemberDto: UpdateFamilyMemberDto) {
    return `This action updates a #${id} familyMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} familyMember`;
  }
}
