import { Injectable } from '@nestjs/common';
import { CreateTaarufApprovalDto } from './dto/create-taaruf_approval.dto';
import { UpdateTaarufApprovalDto } from './dto/update-taaruf_approval.dto';

@Injectable()
export class TaarufApprovalService {
  create(createTaarufApprovalDto: CreateTaarufApprovalDto) {
    return 'This action adds a new taarufApproval';
  }

  findAll() {
    return `This action returns all taarufApproval`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taarufApproval`;
  }

  update(id: number, updateTaarufApprovalDto: UpdateTaarufApprovalDto) {
    return `This action updates a #${id} taarufApproval`;
  }

  remove(id: number) {
    return `This action removes a #${id} taarufApproval`;
  }
}
