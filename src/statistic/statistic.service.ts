import { Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class StatisticService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
    ) {}

    async findNewMember() {
        const newMember = await this.prisma.user.count({
            where: {
                createdAt: {
                    gte: new Date(
                        new Date().setDate(new Date().getDate() - 30),
                    ),
                },
            },
        });
        // if (newMember === 0)
        //     throw new NotFoundException(
        //         'Tidak ada member baru yang mendaftar dalam 30 hari terakhir.',
        //     );
        return newMember;
    }

    async findAllMember() {
        const allMember = await this.prisma.user.count();
        // if (allMember === 0)
        //     throw new NotFoundException('Tidak ada member yang mendaftar.');
        return allMember;
    }

    findActiveMember(max_days: number = 1) {
        // TODO get from auth log
        return `This action returns a statistic`;
    }

    // findByStatus(status) {}

    async findByRelationship(process: string) {
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
