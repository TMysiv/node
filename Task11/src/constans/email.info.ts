import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to Okten',
        html: 'Hello you successfully registration',
    },

    [emailActionEnum.LOGIN]: {
        subject: 'Login',
        html: 'Hello you successfully login',
    },

    [emailActionEnum.LOGOUT]: {
        subject: 'Logout',
        html: 'Hello you successfully logout',
    },

    [emailActionEnum.BLOCKED]: {
        subject: 'Blocked',
        html: 'Sorry your account was blocked',
    },
};
