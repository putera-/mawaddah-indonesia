import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, RoleStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';
import { AppService } from 'src/app.service';

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
    constructor(
        private Prisma: PrismaService,
        private appService: AppService,
    ) {}

    create(data: Prisma.UserCreateInput) {
        return this.Prisma.user.create({
            data,
            select: { ...select },
        });
        // TODO generate activation code and send to user's email address
    }

    formatGray(data: User) {
        data.email = data.email.slice(0, 2) + '...';
        data.firstname = data.firstname.slice(0, 2) + '...';
        data.lastname = data.lastname.slice(0, 2) + '...';
        delete data.avatar;
        delete data.avatar_md;
    }

    async findAll(role: RoleStatus) {
        return await this.Prisma.user.findMany({
            where: { role, active: true },
            select: { ...select, Education: true, Skill: true, Hobby: true, Married_goal:true, Life_goal:true },
        });
    }

    async findOne(id: string, role: RoleStatus): Promise<User> {
        const user = await this.Prisma.user.findFirst({
            where: { id, role, active: true },
            select: { ...select, Education: true, Skill: true, Hobby: true, Married_goal:true, Life_goal:true },
        });
        if (!user) throw new NotFoundException(`User tidak ditemukan`);
        return user;
    }
    async findSuperUser(): Promise<User[]> {
        const users = await this.Prisma.user.findMany({
            where: { role: 'SUPERADMIN' },
        });

        return users;
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        const currentData = await this.Prisma.user.findUnique({
            where: { id },
        });
        if (!currentData) throw new NotFoundException();

        const updatedData = await this.Prisma.user.update({
            where: { id, active: true },
            data,
            select: { ...select },
        });

        if (currentData.avatar) {
            if (currentData.avatar != updatedData.avatar) {
                // photo has been change
                // remove old photo
                this.appService.removeFile(currentData.avatar);
                this.appService.removeFile(currentData.avatar_md);
            }
        }

        return updatedData;
    }

    async updatePassword(id: string, password: string): Promise<void> {
        await this.Prisma.user.update({
            where: { id },
            data: { password },
        });
    }

    async remove(id: string, role: RoleStatus): Promise<void> {
        await this.findOne(id, role);
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
        if (data.password != data.confirm_password)
            throw new BadRequestException('Confirm password tidak sesuai');

        delete data.confirm_password;
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
        return this.Prisma.user.update({
            where: { id },
            data: { active: false },
        });
    }
}
