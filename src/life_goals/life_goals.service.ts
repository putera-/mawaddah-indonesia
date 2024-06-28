import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LifeGoal, Prisma } from '@prisma/client';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class LifeGoalsService {
    constructor(private prisma: PrismaService, private userService: UsersService) { }

    async upsert(biodataId: string, data: Prisma.LifeGoalCreateInput) {

        return this.prisma.lifeGoal.upsert({
            where: { biodataId },
            update: data,
            create: data

        });
    }

    async findOne(userId: string, biodataId: string): Promise<LifeGoal> {
        //TODO insert data dummy jika belum punya life_goal

        const data = await this.prisma.biodata.findFirst({
            where: {
                userId
            },
            select: {
                id: true,
                life_goals: true
            }
        })

        if (!data.life_goals) {
            return this.prisma.lifeGoal.create({
                data: {
                    biodata: { connect: { id: biodataId } }
                }
            })

        }

        return data.life_goals;

    }

}
