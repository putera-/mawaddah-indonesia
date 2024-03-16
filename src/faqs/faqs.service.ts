import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma.service';
import { Faq } from './faqs.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.FAQCreateInput): Promise<Faq> {
    const client = await this.prisma.client.findFirst();
    console.log('hello from crate')
    //connection slider to client
    data.Client = {
      connect: { id: client.id }
    };
    return this.prisma.fAQ.create({ data });
  };

  findAll() {
    return this.prisma.fAQ.findMany({
      where: { deleted: false }
    });
  }

  async findOne(id: string) {
    const faq = await this.prisma.fAQ.findFirst({ where: { id, deleted: false } });
    if (!faq) throw new NotFoundException('faq not found')
    return faq;
  }

  async update(id: string, data: UpdateFaqDto): Promise<Faq> {
    await this.findOne(id);
    return this.prisma.fAQ.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.fAQ.update({
      where: { id },
      data: { deleted: true }
    });

  }
};
