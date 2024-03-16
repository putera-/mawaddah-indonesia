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
        const match = await bcrypt.compare(pass, user.password);

        if (!match) {
            throw new UnauthorizedException('Invalid Credentials!');
        }
        if (!user.active) throw new UnauthorizedException('User is deleted!');

        const { access_token, exp } = await this.createToken(
            user.id,
            user.email,
            user.role,
        );

        // instead of the user object
        return { access_token, exp };
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
        const exp: number = Math.round(dayjs().add(7, 'd').valueOf());

        // save to db
        await this.createAuth(userId, access_token, exp);

        return { access_token, exp };
    }
    async createAuth(
        userId: string,
        access_token: string,
        expiredAt: number,
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
