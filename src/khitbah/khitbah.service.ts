import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KhitbahService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateKhitbahDto, userId: string, taarufid: string) {
    const target = await this.prisma.taaruf.findFirst({
      //supaya hanya mendapatkan punya user dan yang status approved
      where: { id: taarufid, userId: userId, approval: { status: 'Yes' } },
      include: { approval: true, nadhars: true }
    });

    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufid, nadhars: { some: { status: 'Yes' } } },
      include: { nadhars: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const nadhars = taaruf.nadhars;
    if (!nadhars.length) throw new NotFoundException();

    // create khitbah dengan status pending
    await this.prisma.khitbah.create({
      data: {
        ...data,
        Taaruf: { connect: { id: target.id } },
        schedule: data.schedule,
        message: data.message || '',
        reply: data.reply || '',
        status: 'Pending'
      },
    });
    return data;
  }

  async updateDate(taarufId: string, data: UpdateKhitbahDto) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: {
        khitbahs: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const khitbahs = taaruf.khitbahs;
    if (!khitbahs.length) throw new NotFoundException();
    const khitbah = khitbahs[0];

    //check if nadhar was approved, if (approved) => not allowed to update/change data
    if (khitbah.status == 'Yes') throw new BadRequestException('Khitbah sudah disetujui, tidak bisa mengubah data');

    const result = await this.prisma.khitbah.update({
      where: { id: khitbah.id },
      data: {
        schedule: data.schedule
      }
    })
    return result;
  }

  async cancel(taarufId: string) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: { khitbahs: {
        orderBy: { createdAt: 'desc' },
        take: 1
      } },
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const khitbahs = taaruf.khitbahs;
    if (!khitbahs.length) throw new NotFoundException();
    const khitbah = khitbahs[0];

    //check if khitbah was approved, if (approved) => not allowed to update/change data
    if (khitbah.status == 'Yes') throw new BadRequestException('khitbah sudah disetujui, tidak bisa mengubah data');

    const result = await this.prisma.khitbah.update({
      where: { id: khitbah.id },
      data: {
        status: 'No'
      }
    })
    return result;
  }

  async approve(taarufId: string) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: { khitbahs: {
        orderBy: { createdAt: 'desc' },
        take: 1
      } },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const khitbahs = taaruf.khitbahs;
    if (!khitbahs.length) throw new NotFoundException();
    const khitbah = khitbahs[0];

    //check if khitbah was approved, if (approved) => not allowed to update/change data
    if (khitbah.status == 'No') throw new BadRequestException('khitbah sudah ditolak, tidak bisa mengubah data');

    const result = await this.prisma.khitbah.update({
      where: { id: khitbah.id },
      data: {
        status: 'Yes'
      }
    })
    return result;
  }

  async reject(taarufId: string) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: { khitbahs: {
        orderBy: { createdAt: 'desc' },
        take: 1
      } },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const khitbahs = taaruf.khitbahs;
    if (!khitbahs.length) throw new NotFoundException();
    const khitbah = khitbahs[0];

    //check if khitbah was approved, if (approved) => not allowed to update/change data
    if (khitbah.status == 'Yes') throw new BadRequestException('khitbah sudah disetujui, tidak bisa mengubah data');

    const result = await this.prisma.khitbah.update({
      where: { id: khitbah.id },
      data: {
        status: 'No'
      }
    })
    return result;
  }

}
