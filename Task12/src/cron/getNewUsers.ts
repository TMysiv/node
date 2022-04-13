import cron from 'node-cron';
import { usersRepository } from '../repository/users/usersRepository';

export const getNewUsers = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('START WORK WITH GET NEW USERS');
        await usersRepository.getNewUsers();
    });
};
