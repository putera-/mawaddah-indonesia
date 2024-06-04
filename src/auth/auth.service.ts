import {
    BadRequestException,
    GoneException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ActivationService } from 'src/activation/activation.service';
import { ResetPasswordService } from 'src/reset_password/reset_password.service';
import { ResetPasswordDto } from 'src/reset_password/dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private activationService: ActivationService,
        private resetPasswordService: ResetPasswordService,
    ) {}
    private blacklistedTokens: Set<string> = new Set();

    async signIn(email: string, pass: string): Promise<any> {
        email = email.toLowerCase();
        const user = await this.prisma.user.findFirst({
            where: { email, role: 'MEMBER' },
        });
        if (!user)
            throw new UnauthorizedException('Email atau password salah.');
        const match = await bcrypt.compare(pass, user.password);
        if (!match) {
            throw new UnauthorizedException('Email atau password salah.');
        }
        return this.loginProcess(email, user);
    }
    async adminSignIn(email: string, pass: string): Promise<any> {
        email = email.toLowerCase();
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                role: { in: ['ADMIN', 'SUPERADMIN'] },
            },
        });
        if (!user) throw new UnauthorizedException('Otentikasi tidak valid.');
        const match = await bcrypt.compare(pass, user.password);
        if (!match) {
            throw new UnauthorizedException('Otentikasi tidak valid.');
        }
        return this.loginProcess(email, user);
    }

    async loginProcess(email: string, user: any) {
        if (!user.verified) {
            const usedToken = await this.prisma.activation.findFirst({
                where: {
                    userId: user.id,
                    used: false,
                    expiredAt: { gt: new Date() },
                },
                orderBy: { createdAt: 'desc' },
            });
            if (!usedToken) {
                await this.sendActivation(email);
            }
            throw new HttpException(
                'Silahkan periksa email untuk verifikasi akun.',
                HttpStatus.ACCEPTED,
            );
        } else {
            delete user.password;
            delete user.createdAt;
            delete user.updatedAt;
            if (!user.active)
                throw new UnauthorizedException('User telah dinonaktifkan');
            const { access_token, exp } = await this.createToken(
                user.id,
                user.email,
                user.role,
            );
            return { access_token, exp, user };
        }
    }

    async sendActivation(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new NotFoundException('Email salah.');
        return await this.activationService.create(email);
    }

    async sendResetPassword(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new NotFoundException('Email salah.');
        return await this.resetPasswordService.create(email);
    }

    async resetPassword(id: string, data: ResetPasswordDto): Promise<void> {
        // find data by id
        const now = new Date();
        const find = await this.prisma.resetPassword.findFirst({
            where: { id, used: false, expiredAt: { gt: now } },
        });
        if (!find)
            throw new GoneException(
                'Kode reset password sudah invalid, kadaluarsa, atau telah digunakan.',
            );
        const user = await this.prisma.user.findFirst({
            where: { id: find.userId },
        });
        if (!user) throw new NotFoundException('User tidak ditemukan');
        if (data.password != data.confirm_password)
            throw new BadRequestException('Konfirmasi password tidak sesuai');
        delete data.confirm_password;
        data.password = await bcrypt.hash(data.password, 10);
        await this.prisma.resetPassword.updateMany({
            where: { id },
            data: { used: true, expiredAt: now },
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: data.password },
        });
    }

    async checkExpiration(id: string): Promise<boolean> {
        // find data by id
        const now = new Date();
        const expiration = await this.prisma.resetPassword.findFirst({
            where: { id, used: false, expiredAt: { gt: now } },
        });
        return expiration ? true : false;
    }

    async createToken(
        userId: string,
        email: string,
        role: string,
    ): Promise<Record<string, any>> {
        const payload = {
            sub: userId,
            username: email,
            role: role,
        };
        const access_token = (await this.jwtService.signAsync(
            payload,
        )) as string;
        const exp = Math.round(dayjs().add(7, 'd').valueOf()) as number;
        const expDate = new Date(exp);
        // save to db
        await this.createAuth(userId, access_token, expDate);
        return { access_token, exp };
    }

    async createAuth(
        userId: string,
        access_token: string,
        expiredAt: Date,
        path = '/auth/login',
        method = 'POST',
    ): Promise<void> {
        const data: Prisma.AuthCreateInput = {
            user: {
                connect: { id: userId },
            },
            access_token,
            expiredAt,
            path,
            method,
        };
        await this.prisma.auth.create({ data });
    }

    addBlackListToken(token: string) {
        this.blacklistedTokens.add(token);
    }

    isTokenBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }
}
