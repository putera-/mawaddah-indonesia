import { Injectable } from '@nestjs/common';
import { CreateGUserInput } from './dto/create-g-user.input';
import { UpdateGUserInput } from './dto/update-g-user.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GUsersService {
    constructor(
        private Prisma: PrismaService,
    ) { }

    create(createGUserInput: CreateGUserInput) {
        return 'This action adds a new gUser';
    }

    findAll() {
        return this.Prisma.user.findMany({
            orderBy: {
                firstname: 'asc',
            },
            take: 10,
        });
    }

    findOne(id: string) {
        return this.Prisma.user.findUnique({ where: { id } });
    }

    update(id: number, updateGUserInput: UpdateGUserInput) {
        return `This action updates a #${id} gUser`;
    }

    remove(id: number) {
        return `This action removes a #${id} gUser`;
    }
}
