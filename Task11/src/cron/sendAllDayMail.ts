import cron from 'node-cron';
import { userService } from '../services';

export const sendAllDayMail = async () => {
    cron.schedule(' 00 03 1 * *', async () => {
        await userService.sendAllDayMail();
        console.log('emails sent');
    });
};
