import { PartialType } from '@nestjs/mapped-types';
import { CreateNonPhysicalCriteriaDto } from './create-non_physical_criteria.dto';

export class UpdateNonPhysicalCriteriaDto extends PartialType(
    CreateNonPhysicalCriteriaDto,
) {}
