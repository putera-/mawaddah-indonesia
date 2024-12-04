import { PartialType } from '@nestjs/swagger';
import { CreateMainSlideDto } from './create-main_slide.dto';

export class UpdateMainSlideDto extends PartialType(CreateMainSlideDto) {}
