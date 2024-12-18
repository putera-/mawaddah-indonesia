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
        data.avatar = data.blurred_avatar;
        data.avatar_md = data.blurred_avatar_md;
    }

    async findAll(
        roles: RoleStatus[],
        limit = 10,
        page = 1,
    ): Promise<Pagination<User[]>> {
        const skip = (page - 1) * limit;

        const [total, data] = await Promise.all([
            this.Prisma.user.count({
                where: {
                    // active: true,
                    role: { in: roles },
                },
            }),
            this.Prisma.user.findMany({
                where: {
                    // active: true,
                    role: { in: roles },
                },
                include: {
                    biodata: true,
                    Taaruf_gold: {
                        where: {
                            startedAt: { gt: new Date() },
                            endingAt: { lt: new Date() },
                        },
                    },
                    Taaruf: {
                        where: { active: true },
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                    },
                    Taaruf_candidate: {
                        where: { active: true },
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                    },
                    auth: {
                        select: { createdAt: true },
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                    },
                },
                orderBy: { firstname: 'asc' },
                skip,
                take: limit,
            }),
        ]);

        const users: User[] = data;

        for (const user of users) {
            if (user.role == 'MEMBER') {
                this.formatGray(user);

                user.isTaarufGold = user.Taaruf_gold.length ? true : false;
                user.hasBiodata = user.biodata ? true : false;

                user.inTaaruf =
                    user.Taaruf.length || user.Taaruf_candidate.length
                        ? true
                        : false;
            }

            delete user.Taaruf_gold;
            delete user.biodata;
            delete user.Taaruf;
            delete user.Taaruf_candidate;
        }

        return {
            data,
            limit,
            total,
            page,
            maxPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string, role: RoleStatus): Promise<User> {
        const user = await this.Prisma.user.findFirst({
            where: { id, role, active: true },
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
        if (!currentData) throw new NotFoundException('User tidak ditemukan');

        const updatedData = await this.Prisma.user.update({
            where: { id, active: true },
            data,
            select: { ...select },
        });
        if (!updatedData)
            throw new BadRequestException('File yang diinput salah.');

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
        const user = await this.Prisma.user.findFirst({
            where: { id },
            include: { password: true },
        });
        if (!user) throw new NotFoundException('User tidak ditemukan.');

        if (data.password != data.confirm_password)
            throw new BadRequestException('Konfirmasi password tidak sesuai');

        const checkPassword = await bcrypt.compare(
            data.old_password,
            user.password.password,
        );

        if (!checkPassword)
            throw new BadRequestException('Password lama salah');

        const password = await bcrypt.hash(data.password, 10);
        await this.Prisma.password.update({
            where: { userId: user.id },
            data: { password },
        });
    }

    async remove(id: string, role: RoleStatus): Promise<void> {
        const user = await this.findOne(id, role);
        if (!user) throw new NotFoundException('User tidak ditemukan');

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

    async activateUserByUserId(userId: string): Promise<User> {
        // find data by id
        const id = userId;
        const find = await this.Prisma.user.findFirst({
            where: { id, active: false },
        });
        if (!find) {
            throw new NotFoundException('User tidak ditemukan');
        }
        // update data
        const updated = await this.Prisma.user.update({
            where: { id },
            data: { active: true },
        });
        return updated;
    }

    async activateUser(tokenId: string): Promise<User> {
        // find data by id
        const id = tokenId;
        const find = await this.Prisma.activation.findFirst({
            where: { id, used: false },
        });
        // if data is not found
        console.log({ find })
        if (!find)
            throw new BadRequestException(
                'Aktivasi tidak valid, atau sudah expired',
            );
        // set data to used
        const userId = find.userId;
        await this.Prisma.activation.updateMany({
            where: { id },
            data: { used: true },
        });
        // find user
        const user = await this.Prisma.user.findFirst({
            where: { id: userId },
        });
        // if not found
        if (!user) throw new NotFoundException(`User tidak ditemukan`);
        if (!user.active) throw new NotFoundException(`User sudah di aktivasi`);
        // set user to active
        return this.Prisma.user.update({
            where: { id: userId },
            data: {
                active: true,
                verified: true
            },
            select: hiddenSelect,
        });
    }

    async deactivateUser(id: string): Promise<User> {
        return this.Prisma.user.update({
            where: { id },
            data: { active: false },
        });
    }

    async isTaarufGold(userId: string): Promise<boolean> {
        const taaruf_gold_data = await this.Prisma.taaruf_gold.findMany({
            where: {
                userId,
                startedAt: { gt: new Date() },
                endingAt: { lt: new Date() },
            },
        });

        return taaruf_gold_data.length ? true : false;
    }
}
