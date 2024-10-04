import mailgun from "mailgun.js";
import FormData from "form-data";
import jwt from "jsonwebtoken";
import config from "../config";
import { Payload, User } from "../types";

const client = new mailgun(FormData).client({
    username: "api",
    key: config.mailgun.apiKey
});

interface MailProps {
    to: string;
    from: string;
    subject: string;
    html: string;
}

export const sendMail = ({ to, from, subject, html }: MailProps) => {
    return client.messages.create(config.mailgun.domain, { to, from, subject, html });
};

export const sendVerificationMail = (payload: Payload) => {
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "15m" });
    const { email } = payload;

    return sendMail({
        to: email,
        from: `Registration <noreply@taskcanvas.com>`,
        subject: "Verify your TaskCanvas Account",
        html: `<h1>Please click the below link to verify your account. This link will expire after 15 minutes.</h1>
          <a href="${config.domain.url}/verify?token=${token}&type=verification">Verify</a>
        `,
    });
};

export const sendLoginMail = ({ email, name, id, lastLoginTime, lastLoginLocation }: User) => {
    const token = jwt.sign({ email, id, name }, config.jwt.secret, { expiresIn: "15m" });

    return sendMail({
        to: email,
        from: `Login <noreply@taskcanvas.com>`,
        subject: "Sign in to your account portal",
        html: `
            <h1>Please click the below link to log into your account. This link will expire after 15 minutes.</h1>
            <p><a href="${config.domain.url}/verify?token=${token}&type=login">Login</a></p>
            <p>Last login attempted at ${lastLoginTime?.toLocaleString() || new Date().toLocaleString()} from ${lastLoginLocation}</p>
        `,
    });
};