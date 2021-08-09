import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import EmailTemplate from './emailTemplate';

const customerServiceEmail = Meteor.settings.customerServiceEmail;
const productName = Meteor.settings.productName;

Accounts.emailTemplates.from = `${productName} <${customerServiceEmail}>`;
Accounts.emailTemplates.siteName = productName;
// set email headers
//Accounts.emailTemplates.headers = {};


// Enroll
const enrollMessage = 'You have been selected to participate in building a better future!'
    + ' To activate your account, simply click the link below:\n\n';
Accounts.emailTemplates.enrollAccount = {
    from : () => {
        return `${productName} <${customerServiceEmail}>`;
    },
    subject: (user, url) => {
        return `${user.profile.firstName}, welcome to ${productName}`;
    },
    text: (user, url) => {
        return enrollMessage + url;
    },
    html: (user, url) => {
        return EmailTemplate(enrollMessage, "create account", url);
    }
};

// Reset Password
const resetMessage = 'We\'re sorry you\'re having trouble loggin in.  To reset your password, click'
    + ' the link below.  If you did not request a password reset, please disregard this email.\n\n';
Accounts.emailTemplates.resetPassword = {
    from: () => {
        return `${productName}: Password Reset <${customerServiceEmail}>`;
    },
    subject: (user, url) => {
        return `${productName}: reset your password`;
    },
    text: (user, url) => {
        return resetMessage + url;
    },
    html: (user, url) => {
        return EmailTemplate(resetMessage, "reset password", url);
    }
};

// Verify Email
const verifyMessage = `Before using ${productName} please verify your e-mail by following this link:\n\n`;
Accounts.emailTemplates.verifyEmail = {
    from: () => {
        return `${productName}: Verify Email Address <${customerServiceEmail}>`;
    },
    subject: (user, url) => {
        return `${productName}: verify your email address`;
    },
    text: (user, url) => {
        return verifyMessage + url;
    },
    html: (user, url) => {
        return EmailTemplate(verifyMessage, "verify email", url);
    }
};
