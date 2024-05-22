import { PartialType } from '@nestjs/mapped-types';
import { CreateTaarufApprovalDto } from './create-taaruf_approval.dto';

export class UpdateTaarufApprovalDto extends PartialType(CreateTaarufApprovalDto) {}
