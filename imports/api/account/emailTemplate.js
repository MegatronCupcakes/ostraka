import { Meteor } from "meteor/meteor";
import Logo from './logoString';

const productName = Meteor.settings.productName;

const EmailTemplate = (message, actionLabel, actionUrl) => {
    return `<!DOCTYPE html>
    <html>
        <style>
        </style>
        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        </head>
        <body>
            <div style="width: 100%; text-align: center; margin-bottom: 20px;">
                <img src="${Logo}" style="max-height: 80px;"/>
            </div>
            <div style="width: 100%; text-align: center; margin-bottom: 20px;">
                <h1>${productName}: ${actionLabel}</h1>
            </div>
            <div style="width: 100%; text-align: center; margin-bottom: 20px;">
                ${message}
            </div>
            <div style="width: 100%; text-align: center; margin-bottom: 20px;">
                <a href="${actionUrl}"><button class="btn btn-primary">${actionLabel}</button></a>
            </div>
        </body>
    </html>`;
};
export default EmailTemplate;
