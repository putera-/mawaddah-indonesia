import { PartialType } from '@nestjs/mapped-types';
import { CreateMarriedGoalDto } from './create-married_goal.dto';

export class UpdateMarriedGoalDto extends PartialType(CreateMarriedGoalDto) {}
