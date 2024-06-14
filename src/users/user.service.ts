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
// import { ActivationService } from 'src/activation/activation.service';

const select = {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    active: true,
    verified: true,
    avatar: true,
    avatar_md: true,
    blurred_avatar: true,
    blurred_avatar_md: true,
    role: true,
    taaruf_status: true,
};
const hiddenSelect = {
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    active: true,
    verified: true,
    blurred_avatar: true,
    blurred_avatar_md: true,
    role: true,
    taaruf_status: true,
};
@Injectable()
export class UsersService {
    constructor(
        private Prisma: PrismaService,
        private appService: AppService,
        // private activation: ActivationService,
    ) { }

    create(data: Prisma.UserCreateInput) {
        return this.Prisma.user.create({
            data,
            select: { ...select },
        });
    }

    formatGray(data: User) {
        data.email = data.email.slice(0, 2) + '...';
        // data.firstname = data.firstname.slice(0, 2) + '...';
        data.lastname = data.lastname.slice(0, 2) + '...';
        delete data.avatar;
        delete data.avatar_md;
        delete data.password;
    }

    async findAll(roles: RoleStatus[], limit = 10, page = 1): Promise<Pagination<User[]>> {
        const skip = (page - 1) * limit;

        const [total, data] = await Promise.all([

            this.Prisma.user.count({
                where: {
                    active: true,
                    role: { in: roles }
                }
            }),
            this.Prisma.user.findMany({
                where: {
                    active: true,
                    role: { in: roles }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
        ]);

        for (const user of data) {
            if (user.role == 'MEMBER') {
                this.formatGray(user);
            }
        }

        return {
            data,
            limit,
            total,
            page,
            maxPages: Math.ceil(total / limit),
        }

    }

    async findOne(id: string, role: RoleStatus): Promise<User> {
        const user = await this.Prisma.user.findFirst({
            where: { id, role, active: true },
            // DONT DO THIS HERE
            // select: {
            //     ...hiddenSelect,
            //     biodata: true,
            //     Education: true,
            //     Skill: true,
            //     Hobby: true,
            //     Married_goal: true,
            //     Life_goal: true,
            // },
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
                // prevent remove dummy photo
                const dummy_file = ['/dummy/nissa.png', '/dummy/abang.png'];
                if (!dummy_file.includes(currentData.avatar)) {
                    this.appService.removeFile('/public' + currentData.avatar);
                    this.appService.removeFile(
                        '/public' + currentData.avatar_md,
                    );
                }
            }
        }

        return updatedData;
    }

    async updatePassword(id: string, data: any): Promise<void> {
        const user = await this.Prisma.user.findFirst({ where: { id } });
        if (!user) throw new NotFoundException();
        if (data.password != data.confirm_password)
            throw new BadRequestException('Konfirmasi password tidak sesuai');
        const checkPassword = await bcrypt.compare(
            data.old_password,
            user.password,
        );
        if (!checkPassword)
            throw new BadRequestException('Password lama salah');

        delete data.confirm_password;
        delete data.old_password;
        data.password = await bcrypt.hash(data.password, 10);
        await this.Prisma.user.update({
            where: { id: user.id },
            data: { password: data.password },
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
            throw new BadRequestException('Konfirmasi password tidak sesuai');

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
        if (checkUser) throw new ConflictException('Email sudah terdaftar');
    }
    async activateUser(id: string): Promise<User> {
        // find data by id
        const find = await this.Prisma.activation.findFirst({
            where: { id, used: false },
        });
        // if data is not found
        if (!find)
            throw new BadRequestException(
                'Aktivasi tidak valid, atau sudah expired',
            );
        // set data to used
        const userId = find.userId;
        await this.Prisma.activation.updateMany({
            where: { id: userId },
            data: { used: true },
        });
        // find user
        const user = await this.Prisma.user.findFirst({
            where: { id: userId, active: false },
        });
        // if not found
        if (!user) throw new NotFoundException(`User tidak ditemukan`);
        // set user to active
        return this.Prisma.user.update({
            where: { id: userId },
            data: { active: true },
            select: hiddenSelect,
        });
    }
    async deactivateUser(id: string): Promise<User> {
        return this.Prisma.user.update({
            where: { id },
            data: { active: false },
        });
    }
}
