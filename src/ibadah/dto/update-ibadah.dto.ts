import { PartialType } from '@nestjs/mapped-types';
import { CreateIbadahDto } from './create-ibadah.dto';

export class UpdateIbadahDto extends PartialType(CreateIbadahDto) {}
