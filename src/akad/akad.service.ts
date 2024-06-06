import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AkadService {
  constructor(private prisma: PrismaService) { }
  
    async getAll(userId: string) {
    return this.prisma.taaruf.findMany({
      where: { userId: userId },
      include: { approval: true, nadhars: true }
    });
  }

  getAllRequests() {
    return this.prisma.akad.findMany({
      where: { status: 'Pending' }
    });
  }
  
    async create(data: CreateAkadDto, userId: string, taarufid: string) {
    const target = await this.prisma.taaruf.findFirst({
      //supaya hanya mendapatkan punya user dan yang status approved
      where: { id: taarufid, userId: userId, approval: { status: 'Yes' } },
      include: { approval: true, nadhars: true }
    });

    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufid, khitbahs: { some: { status: 'Yes' } } },
      include: { khitbahs: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const khitbahs = taaruf.khitbahs;
    if (!khitbahs.length) throw new NotFoundException();
    const khitbah = khitbahs[0];

    //memastikan nadhor sudah disetujui
    if (khitbah.status != 'Yes') throw new BadRequestException('Kamu harus menyelesaikan tahap sebelumnya sebelum dapat melanjutkan ke tahap berikutnya');

    // create khitbah dengan status pending
    await this.prisma.akad.create({
      data: {
        ...data,
        Taaruf: { connect: { id: taarufid } },
        schedule: data.schedule,
        message: data.message || '',
        reply: data.reply || '',
        status: 'Pending'
      },
    });
    return data;
  }
  
    async updateDate(taarufId: string, data: UpdateAkadDto) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: { akads: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const akads = taaruf.akads;
    if (!akads.length) throw new NotFoundException();
    const akad = akads[0];

    //check if akad was approved, if (approved) => not allowed to update/change data
    if (akad.status == 'Yes') throw new BadRequestException('akad sudah disetujui, tidak bisa mengubah data');

    const result = await this.prisma.akad.update({
      where: { id: akad.id },
      data: {
        schedule: data.schedule
      }
    })
    return result;
  }
  
    async cancel(taarufId: string) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: { akads: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const akads = taaruf.akads;
    if (!akads.length) throw new NotFoundException();
    const akad = akads[0];

    //check if akad was approved, if (approved) => not allowed to update/change data
    if (akad.status == 'Yes') throw new BadRequestException('akad sudah disetujui, tidak bisa mengubah data');

    const result = await this.prisma.akad.update({
      where: { id: akad.id },
      data: {
        status: 'No'
      }
    })
    return result;
  }
  
    async approve(taarufId: string) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: { akads: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan'); 

    const akads = taaruf.akads;
    if (!akads.length) throw new NotFoundException();
    const akad = akads[0];

    //check if akad was approved, if (approved) => not allowed to update/change data
    if (akad.status == 'No') throw new BadRequestException('akad sudah ditolak, tidak bisa mengubah data');

    const result = await this.prisma.akad.update({
      where: { id: akad.id },
      data: {
        status: 'Yes'
      }
    })
    return result;
  }
  
    async reject(taarufId: string) {
    const taaruf = await this.prisma.taaruf.findFirst({
      where: { id: taarufId },
      include: { akads: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    //cek apakan data taaruf ada apa tidak
    if (!taaruf) throw new NotFoundException('Data taaruf tidak ditemukan');

    const akads = taaruf.akads;
    if (!akads.length) throw new NotFoundException();
    const akad = akads[0];

    //check if akad was approved, if (approved) => not allowed to update/change data
    if (akad.status == 'Yes') throw new BadRequestException('akad sudah disetujui, tidak bisa mengubah data');

    const result = await this.prisma.akad.update({
      where: { id: akad.id },
      data: {
        status: 'No'
      }
    })
    return result;
  }

}
  