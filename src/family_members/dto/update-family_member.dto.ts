import { PartialType } from '@nestjs/swagger';
import { CreateFamilyMemberDto } from './create-family_member.dto';

export class UpdateFamilyMemberDto extends PartialType(CreateFamilyMemberDto) {}
