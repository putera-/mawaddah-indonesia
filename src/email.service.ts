import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from './prisma.service';

@Injectable()
export class EmailService {
    // private transporter: nodemailer.Transporter;
    constructor(
        private readonly configService: ConfigService,
        private Prisma: PrismaService,
        // private activationService: ActivationService
    ) {
        // this.transporter = nodemailer.createTransport({
        //     host: this.configService.get('AUTH_HOST'),
        //     port: this.configService.get('AUTH_PORT'),
        //     secure: false,
        //     auth: {
        //         user: this.configService.get('AUTH_EMAIL'),
        //         pass: this.configService.get('AUTH_PASSWORD'),
        //     },
        //     tls: {
        //         rejectUnauthorized: false,
        //     },
        // });
    }

    async sendToken(id: string) {
        const transporter = nodemailer.createTransport({
            host: this.configService.get('AUTH_HOST'),
            port: this.configService.get('AUTH_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('AUTH_EMAIL'),
                pass: this.configService.get('AUTH_PASSWORD'),
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const act = await this.Prisma.activation.findFirst({ where: { id } });
        const mailOptions: any = {
            from: `"${this.configService.get('AUTH_NAME')}" <${this.configService.get('AUTH_EMAIL')}>`,
            to: act.email,
            subject: 'Activation link',
            html: `<h1>Assalamualaikum,  ${act.email}.</h1>
            <p>Silakan tekan tombol ini untuk mengaktifkan akun Mawaddah anda.</p>
            <a href="${this.configService.get('CLIENT_URL')}/auth/activate/
            ${id}?token=${act.activation_key}">Aktivasi</a>
            <p>Aktivasi ini hanya berlaku 1 jam.</p>`,
        };
        const sendEmail = transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
        console.log('email sent');
        return sendEmail;
    }
    async sendMailGun(id: string) {
        const DOMAIN = 'sandboxaf5854dd8a164233babb6dfb69607e1a.mailgun.org';
        // const mg = mailgun({ apiKey: '<PRIVATE_API_KEY>', domain: DOMAIN });
        const data = {
            from: 'Mailgun Sandbox <postmaster@sandboxaf5854dd8a164233babb6dfb69607e1a.mailgun.org>',
            to: 'albashiroh.programming@gmail.com',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!',
        };
        // mg.messages().send(data, function (error, body) {
        //     console.log(body);
        // });
    }
    async createToken(email: string) {
        // const createToken = await this.Prisma.activation.create({
        //     data: email,
        // }); SrqzwF3H*x6Nj@5
    }
}
