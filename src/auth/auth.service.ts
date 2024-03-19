import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}
    private blacklistedTokens: Set<string> = new Set();

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new UnauthorizedException('Email atau password salah.');

        const match = await bcrypt.compare(pass, user.password);
        if (!match) {
            throw new UnauthorizedException('Email atau password salah.');
        }

        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;

        if (!user.active) throw new UnauthorizedException('User telah dihapus');

        const { access_token, exp } = await this.createToken(
            user.id,
            user.email,
            user.role,
        );

        return { access_token, exp, user };
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
