import nodemailer from 'nodemailer';

import { config } from '../config/config';
import { emailActionEnum, emailInfo } from '../constans';

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD,
    },
});

class EmailService {
    sendEmail(userEmail:string, action:emailActionEnum) {
        const { subject, html } = emailInfo[action];

        return emailTransporter.sendMail({
            from: 'No Reply sep-2021',
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
