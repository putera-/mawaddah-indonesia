import { PartialType } from '@nestjs/mapped-types';
import { CreateLifeGoalDto } from './create-life_goal.dto';

export class UpdateLifeGoalDto extends PartialType(CreateLifeGoalDto) {}
