import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, TaarufStatus } from '@prisma/client';
import { Education } from './educations.interface';
import { BiodataService } from 'src/biodata/biodata.service';

const select = {
    id: true,
    institution_name: true,
    major: true,
    degree: true,
    city: true,
    startYear: true,
    endYear: true,
    createdAt: true,
    updatedAt: true,
};

@Injectable()
export class EducationsService {
    constructor(private prisma: PrismaService, private biodataService: BiodataService) { }
    async create(
        id: string,
        data: Prisma.EducationCreateInput,
    ): Promise<Education> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                biodata: true
            }
        });

        if (user.taaruf_status !== TaarufStatus.OPEN)
            throw new ForbiddenException(`Taaruf is not open or pending`);

        return this.prisma.education.create({
            data: { ...data, Biodata: { connect: { id: user.biodata.id } } },
            select,
        });
    }

    async findAll(
        userId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<Pagination<Education[]>> {
        const skip = (page - 1) * limit;
        const biodata = await this.biodataService.findMe(userId);
        const [total, data] = await Promise.all([
            this.prisma.education.count({
                where: { biodataId: biodata.id, deleted: false },
            }),
            this.prisma.education.findMany({
                where: { biodataId: biodata.id, deleted: false },
                orderBy: { createdAt: 'desc' },
                select,
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

    async findOne(userId: string, id: string): Promise<Record<string, any>> {
        const biodata = await this.biodataService.findMe(userId);
        const data = await this.prisma.education.findFirst({
            where: { id, biodataId: biodata.id, deleted: false },
            select,
        });
        if (!data) throw new NotFoundException();
        return data;
    }

    async update(
        userId: string,
        id: string,
        data: UpdateEducationDto,
    ): Promise<Education> {
        const educationId = await this.findOne(userId, id);

        return this.prisma.education.update({
            where: { id: educationId.id },
            data: { ...data },
            select,
        });
    }

    async remove(userId: string, id: string): Promise<void> {
        const educationId = await this.findOne(userId, id);

        await this.prisma.education.update({
            where: { id: educationId.id },
            data: { deleted: true },
        });
        return;
    }
}
