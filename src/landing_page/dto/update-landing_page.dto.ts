import { PartialType } from '@nestjs/swagger';
import { CreateLandingPageDto } from './create-landing_page.dto';

export class UpdateLandingPageDto extends PartialType(CreateLandingPageDto) {}
