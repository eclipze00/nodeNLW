import { MailAdapter, SendMailData } from '../mailAdapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1f24f6a8737440",
        pass: "287f315fea7ab3"
    }
    });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feeget.com>',
            to: 'Guilherme Rodrigues <devguilherme.rodrigues@gmail.com>',
            subject,
            html: body, 
        });
    }
}