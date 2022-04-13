import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to Netflix',
        templateName: 'welcome',
    },

    [emailActionEnum.LOGIN]: {
        subject: 'Login',
        templateName: 'login',
    },

    [emailActionEnum.LOGOUT]: {
        subject: 'Logout',
        templateName: 'out',
    },

    [emailActionEnum.BLOCKED]: {
        subject: 'Blocked',
        templateName: 'blocked',
    },

    [emailActionEnum.FORGOTPASSWORD]: {
        subject: 'Password',
        templateName: 'forgotPassword',
    },

    [emailActionEnum.ALLDAYMAIL]: {
        subject: 'Update Films',
        templateName: 'allDayMail',
    },
};
