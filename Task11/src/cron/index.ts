import { sendAllDayMail } from './sendAllDayMail';

export const cronRun = async () => {
    await sendAllDayMail();
};
