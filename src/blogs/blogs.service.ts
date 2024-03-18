import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { Blog } from './blogs.interface';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) { }


  async create(data: Prisma.blogCreateInput): Promise<Blog> {
    return this.prisma.blog.create({
      data
    });
  }

  findAll() {
    return this.prisma.blog.findMany({
      where: { deleted: false }
    });
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.prisma.blog.findFirst({ where: { id, deleted: false } });
    if (!blog) throw new NotFoundException('blog not found')
    return blog
  }

  async update(id: string, data: Prisma.blogUpdateInput): Promise<Blog> {
    // const blog = await this.prisma.blog.findFirst({
    //   where: {id, deleted: false}
    // });

    // if(!blog) throw new NotFoundException('blog not found')
    await this.findOne(id);
    return this.prisma.blog.update({
      where: { id },
      data
    });
  };

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.blog.update({
      where: { id },
      data: { deleted: true }
    });
  };
};

