import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { Blog } from '@prisma/client';

@Injectable()
export class BlogsService {
    constructor(private prisma: PrismaService) { }

    create(data: CreateBlogDto): Promise<Blog> {
        return this.prisma.blog.create({ data });
    }

    async findAll(page: number = 1, limit: number = 10): Promise<Pagination<Blog[]>> {
        const skip = (page - 1) * limit;
        const [total, data] = await Promise.all([
            this.prisma.blog.count({
                where: { deleted: false },
            }),
            this.prisma.blog.findMany({
                where: { deleted: false },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit),
            }),
        ]);

        return {
            data,
            total,
            page: +page,
            maxPages: Math.ceil(total / limit),
            limit: +limit,
        };
    }

    findOne(id: string): Promise<Blog> {
        return this.prisma.blog.findUnique({ where: { id, deleted: false } });
    }

    async update(id: string, data: UpdateBlogDto): Promise<Blog> {
        const blog = await this.findOne(id);
        if (!blog) throw new Error('Blog not found');

        return this.prisma.blog.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<void> {
        const blog = await this.findOne(id);
        if (!blog) throw new Error('Blog not found');

        await this.prisma.blog.update({
            where: { id },
            data: { deleted: true },
        });

        return;
    }
}
