import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { Blog, Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';

@Injectable()
export class BlogsService {
    constructor(
        private prisma: PrismaService,
        private appService: AppService,
    ) { }

    create(data: Prisma.BlogCreateInput): Promise<Blog> {
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

    async update(id: string, data: Prisma.BlogUpdateInput): Promise<Blog> {
        const currentData = await this.findOne(id);
        if (!currentData) throw new Error('Blog not found');

        const updateData = await this.prisma.blog.update({
            where: { id },
            data,
        });

        if (currentData.image != updateData.image) {
            if (!currentData.image.includes('/dummy')) {
                this.appService.removeFile('/public' + currentData.image);
                this.appService.removeFile('/public' + currentData.image_md);
            }
        }

        return updateData;
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
