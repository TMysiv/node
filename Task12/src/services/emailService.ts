import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplates from 'email-templates';
import path from 'path';

import { config } from '../config/config';
import { emailActionEnum, emailInfo } from '../constants';

class EmailService {
    emailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.NO_REPLY_EMAIL,
            pass: config.NO_REPLY_EMAIL_PASSWORD,
        },
    });

    async sendEmail(userEmail:string, action:emailActionEnum, context = {})
        :Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        const templateRenderer = new EmailTemplates({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, 'email-templates'),
            },
        });

        Object.assign(context, { frontedUrl: config.START_SITE });

        const html = await templateRenderer.render(templateName, context);

        return this.emailTransporter.sendMail({
            from: 'No Reply sep-2021',
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
