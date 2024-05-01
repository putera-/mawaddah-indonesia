import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from './prisma.service';

@Injectable()
export class EmailService {
    async sendToken(id: string) {
        try {
            const clientId =
                '1080905388605-ief99h038d1vek9h69mo82iam46b55rf.apps.googleusercontent.com';
            const clientSecret = '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';
            const refreshToken =
                '1//04Gox1tL1ojf_CgYIARAAGAQSNwF-L9IrsHPd6ixVGDb4nFxgyk1BnQhwYfVe-AP_B_yzI3je_7LgcP21hoWRBNazV9OVdDbAiGo';
            const accessToken =
                'ya29.a0Ad52N39AMSxiOJbyAUj25e7z4FeUkG7e5gLgwMqIjkOg-vaJTbdwYt2j0JhgxOFJIBz6oskpydgX8k2qkAlMT2jRNypfRsWTs7uQo_iNAwcAOkFODAVm5xnPB9ZBvPqJU5Q5Ciru6N2USpiUbghMMFj5sQgOUnr9-zZ0aCgYKAUUSARMSFQHGX2Mi8uiKZdPHMN3W8OpOZoPwwA0171';

            const from = 'rizjamiputera@gmail.com';

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: from,
                    clientId,
                    clientSecret,
                    refreshToken,
                    accessToken,
                },
                tls: { rejectUnauthorized: true },
            });

            const to = 'halaqahngupi@gmail.com';
            const subject = 'Test Kirim email lewat Nest';
            const html = `
                <h2><bold>Test Lagi</bold></h2>
                <p>Thanks a lot</p>
            `;

            await transport.sendMail({
                from,
                to,
                subject,
                html,
            });

            console.log('kirim email berhasil');

            return 'SUCCESS';
        } catch (error) {
            console.log('error kirim email');
            console.log(error);
        }
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
