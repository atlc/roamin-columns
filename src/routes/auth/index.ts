import express from 'express';
import jwt from 'jsonwebtoken';
import { BaseUser, Payload } from '../../types';
import db from '../../db';
import validators from '../../validators';
import { sendLoginMail, sendVerificationMail } from '../../services/mailgun';
import config from '../../config';
import { tokenCheck } from '../../middlewares/tokenCheck';

const router = express.Router();

router.post('/register', validators.users.registration, async (req, res) => {
    const { name, email } = req.body as BaseUser;
    try {
        const { id } = await db.users.register({ name, email }, req.useragent);
        await sendVerificationMail({ id, name, email });
        res.status(201).json({ message: "Please check your email to finish registration" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.post('/login', validators.users.login, async (req, res) => {
    const { email } = req.body as BaseUser;
    try {
        const [user] = await db.users.find(email, req.useragent);

        if (user) {
            await sendLoginMail(user)
        }

        res.status(200).json({ message: "If that email exists in our system, an email will have been sent to your inbox to finish logging in." })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.get('/verify', validators.users.verify, async (req, res) => {
    const { token, type } = req.query as { token: string; type: string };

    jwt.verify(token, config.jwt.secret, async (err, payload) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }

        const { id, name, email } = payload as Payload;

        if (type === 'verification') {
            await db.users.verify(id, req.useragent);
        }

        const accessToken = jwt.sign({ id, name, email } as Payload, config.jwt.secret, { expiresIn: '30d' });
        res.status(200).json({ message: "Successfully logged in", accessToken });
    })
});

router.get('/check', tokenCheck, (req, res) => { res.json({ message: "All good!" }) });

export default router;