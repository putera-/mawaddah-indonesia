import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    async sendToken(email: string, subject: string, html: string) {
        try {
            const clientId = process.env.EMAIL_ID;
            const clientSecret = process.env.EMAIL_SECRET;
            const refreshToken = process.env.REFRESH_TOKEN;
            const accessToken = process.env.EMAIL_TOKEN;

            const from = process.env.EMAIL_ADDRESS;

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

            const to = email;

            await transport.sendMail({
                from,
                to,
                subject,
                html,
            });

            return 'SUCCESS';
        } catch (error) {}
    }
    async sendActivation(id: string, email: string) {
        const activationTo = email;
        const activationSubject = 'Activate your account';
        const activationHtml = `
            <h2><bold>Activate your account</bold></h2>
            <a href='${process.env.DOMAIN_NAME}/activate?token=${id}'>Activate token</a >
        `;
        await this.sendToken(activationTo, activationSubject, activationHtml);
    }
    async sendResetPassword(id: string, email: string) {
        const sendResetTo = email;
        const sendResetSubject = 'Reset your password';
        const sendResetHtml = `
            <h2><bold>Reset your password</bold></h2>
            <a href='${process.env.DOMAIN_NAME}/reset-password?token=${id}'>Reset password</a >
        `;
        await this.sendToken(sendResetTo, sendResetSubject, sendResetHtml);
    }
}
