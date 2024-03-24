import { Injectable } from '@nestjs/common';
import { CreateResetPasswordDto } from './dto/create-reset_password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset_password.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

import dayjs from 'dayjs';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';

@Injectable()
export class ResetPasswordService {
  constructor(private prisma: PrismaService, private userService: UsersService, private authService: AuthService, private jwtService: JwtService,
  ) { }

  //TODO TINGGAL BIKIN VALIDASINYA DAN BLABLA
  async create(token: string, userEmail: string, data: Prisma.Reset_passwordCreateInput) {
    const user = await this.prisma.user.findUnique({ where: { email: userEmail }, select: { id: true, email: true } });
    const email = await this.prisma.reset_password.findFirst({ where: { token } });

    console.log(userEmail)
    console.log(email)
    const expiredAt = dayjs().add(1, 'hour').toDate();

    const result = await this.prisma.reset_password.create({
      data: {
        ...data,
        user: { connect: { id: user.id } },
        userEmail,
        expiredAt: expiredAt,
      }

    });
    //ini code buat ngirim email
    //blabla..
    return result;
  }

  async update(token: string, id: string, data: ChangePasswordDto) {
    // const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true } });
    const email = await this.prisma.reset_password.findFirst({ where: { token } });
    await this.userService.checkPassword(data);

    //pakai userId karena dari userServicenya dia terimanya id, bukan email.
    const result =  await this.userService.updatePassword(email.userId , data.password);

    return result;

  }
  

}
