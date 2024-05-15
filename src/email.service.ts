import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from './prisma.service';

@Injectable()
export class EmailService {
    constructor(private Prisma: PrismaService) { }
    getGmailTransport(): nodemailer.Transporter {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ADDRESS,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
    }
    async sendToken(email: string, subject: string, html: string) {
        try {
            const transport: nodemailer.Transporter = this.getGmailTransport();
            const to = email;
            await transport.sendMail({
                to,
                subject,
                html,
            });
            console.log('SUCCESS');
            return 'SUCCESS';
        } catch (error) {
            console.log(error);
        }
    }
    async sendActivation(id: string, email: string) {
        const web_uri = process.env.WEB_URI;
        const user = await this.Prisma.user.findFirst({ where: { email } });
        const fullname = user.firstname + ' ' + user.lastname;
        const activationTo = email;
        const activationSubject = 'Aktivasi akun';
        const activationHtml = `
        <div style=" width:100%; height: 100%">
        <div style="background-image: url('https://mawaddahindonesia.albashiroh.com/Mawaddah-icon.png'); height: 250px; width: 250px; background-size:contain;background-repeat: no-repeat;">
        </div>
        </div>
        <h2><bold>Assalamualaikum, ${fullname}.</bold></h2>
        <p>Aktivasi akun anda dengan klik tombol dibawah ini. </p>
        <div style="width:250px; text-align:center;">
        <div>
        <a href='${web_uri}/activate?token=${id}'>
        <button style="font-size:15px; font-weight: bold; background-color: #F8B23B ;background-image: linear-gradient(#F8B23B, #926923); border-color:black; border-size: 2px; padding: 8px; border-radius:20px;"> Aktivasi akun </button>
        </a >
        <p style="color: red; font-size: 10px; margin-top:10px;">Link akan kadaluarsa dalam 1 hari.</p>
        <a href="${web_uri}">${web_uri}</a>
        </div>
            </div>`;
        await this.sendToken(activationTo, activationSubject, activationHtml);
    }
    async sendResetPassword(id: string, email: string) {
        const web_uri = process.env.WEB_URI;
        const user = await this.Prisma.user.findFirst({ where: { email } });
        const fullname = user.firstname + ' ' + user.lastname;
        const sendResetTo = email;
        const sendResetSubject = 'Atur ulang kata sandi';
        const sendResetHtml = `
        <div style="height:100%; width:100%;">
            <div style="background-image: url('https://mawaddahindonesia.albashiroh.com/Mawaddah-icon.png'); height: 250px; width: 250px; background-size:contain; background-repeat: no-repeat;">
            </div>
        </div>
        <h2><bold>Assalamualaikum, ${fullname}.</bold></h2>
        <p>Atur ulang sandi anda dengan klik tombol dibawah ini. </p>
        <div style="width:250px; text-align:center;">
        <div>
        <a href='${web_uri}/reset-password?token=${id}'>
        <button style="font-size:15px; font-weight: bold; background-color: #F8B23B ;background-image: linear-gradient(#F8B23B, #926923); border-color:black; border-size: 2px; padding: 8px; border-radius:20px;"> Atur ulang sandi </button>
        </a >
        <p style="color: red; font-size: 10px; margin-top:10px;">Link akan kadaluarsa dalam 1 hari.</p>
        <a href="${web_uri}">${web_uri}</a>
        </div>
        </div>
        `;
        await this.sendToken(sendResetTo, sendResetSubject, sendResetHtml);
    }
}
