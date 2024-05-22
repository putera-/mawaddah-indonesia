import { PartialType } from '@nestjs/mapped-types';
import { CreateKhitbahDto } from './create-khitbah.dto';

export class UpdateKhitbahDto extends PartialType(CreateKhitbahDto) {}
