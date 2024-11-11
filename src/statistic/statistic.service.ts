import { Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalStatus } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class StatisticService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
    ) {}

    async findNewMember(): Promise<number> {
        const newMember = await this.prisma.user.count({
            where: {
                createdAt: {
                    gte: new Date(
                        new Date().setDate(new Date().getDate() - 30),
                    ),
                },
            },
        });
        return newMember;
    }

    async findByDate(range: number = 30) {
        console.log(range);
        // const result = (await this.prisma.$queryRaw`
        //     SELECT
        //         DATE("createdAt") as date,
        //         COUNT(*) as count
        //     FROM
        //         "auth"
        //     WHERE
        //         "createdAt" >= NOW() - INTERVAL '30 days'
        //     GROUP BY
        //         DATE("createdAt")
        //     ORDER BY
        //         date DESC
        //         ;`) as Record<string, any>[];

        const result = (await this.prisma.$queryRaw`
        WITH date_series AS (
    SELECT
      generate_series(
        NOW()::date - INTERVAL '10 days',
        NOW()::date,
        '1 day'
      )::date AS date
  )
  SELECT
    ds.date,
    COUNT(a.id) AS count
  FROM
    date_series ds
  LEFT JOIN
    "auth" a ON DATE(a."createdAt") = ds.date
  GROUP BY
    ds.date
  ORDER BY
    ds.date DESC;`) as Record<string, any>[];
        return result.map((item) => ({
            date: item.date.toISOString().split('T')[0],
            count: Number(item.count), // Convert BigInt to regular number
        }));
    }

    async findAllMember(): Promise<number> {
        const allMember = await this.prisma.user.count();
        return allMember;
    }

    async findActiveMember(max_days: number = 1): Promise<number> {
        // how to get day before
        const gte = dayjs().subtract(max_days, 'day').toDate();

        return await this.prisma.user.count({
            where: {
                auth: {
                    some: {
                        createdAt: {
                            gte,
                        },
                    },
                },
            },
        });
    }

    async findByRelationship(process: string): Promise<number> {
        let where: any = {};
        switch (process) {
            case 'taaruf':
                where = {
                    Taaruf: {
                        some: {
                            status: ApprovalStatus.Approved,
                        },
                    },
                };
                break;
            case 'nadhar':
                where = {
                    Nadhar: {
                        some: {
                            status: ApprovalStatus.Approved,
                        },
                    },
                };
                break;
            case 'khitbah':
                where = {
                    Khitbah: {
                        some: {
                            status: ApprovalStatus.Approved,
                        },
                    },
                };
                break;
            case 'akad':
                where = {
                    Akad: {
                        some: {
                            status: ApprovalStatus.Approved,
                        },
                    },
                };
                break;
            default:
                return where;
        }

        const userByStatus = await this.prisma.user.count({
            where,
        });
        return userByStatus;
    }
}
