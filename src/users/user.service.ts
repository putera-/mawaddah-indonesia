import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';

const select = {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    active: true,
    verified: true,
    avatar: true,
    avatar_md: true,
    role: true,
    taaruf_status: true,
};
@Injectable()
export class UsersService {
    constructor(private Prisma: PrismaService) {}

    create(data: Prisma.UserCreateInput) {
        return this.Prisma.user.create({
            data,
            select: { ...select },
        });
    }

    formatGray(data: User) {
        data.email = data.email.slice(0, 2) + '...';
        data.firstname = data.firstname.slice(0, 2) + '...';
        data.lastname = data.lastname.slice(0, 2) + '...';
        delete data.avatar;
        delete data.avatar_md;
    }

    async findAll() {
        return this.Prisma.user.findMany({
            where: { active: true, role: 'MEMBER' },
            select: { ...select },
        });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.Prisma.user.findFirst({
            where: { id, active: true },
            select: { ...select },
        });
        if (!user) throw new NotFoundException(`User tidak ditemukan`);
        return user;
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        await this.findOne(id);
        return this.Prisma.user.update({ where: { id }, data });
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.Prisma.user.update({
            where: { id },
            data: { active: false },
        });
    }
    async findByEmail(email: string): Promise<User> {
        email = email.trim().toLowerCase();
        const user = await this.Prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    async checkPassword(data: any) {
        if (data.password != data.password_confirm)
            throw new BadRequestException('Confirm password tidak sesuai');

        delete data.password_confirm;
        data.password = await bcrypt.hash(data.password, 10);
    }
    async validateNewUser(data: any) {
        // check is password
        await this.checkPassword(data);

        // email to lowercase
        data.email = data.email.toLowerCase().trim();

        // check is email taken?
        const checkUser = await this.findByEmail(data.email);
        if (checkUser) throw new ConflictException('Email sudah terpakai');
    }
    async activateUser(id: string): Promise<User> {
        const user = await this.Prisma.user.findFirst({
            where: { id },
        });
        if (!user) throw new NotFoundException(`User tidak ditemukan`);
        return this.Prisma.user.update({
            where: { id },
            data: { active: true },
        });
    }
    async deactivateUser(id: string): Promise<User> {
        await this.findOne(id);
        return this.Prisma.user.update({
            where: { id },
            data: { active: false },
        });
    }
}
