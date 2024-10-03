import { Request, Response, NextFunction, RequestHandler } from "express";
import { BaseUser } from "../types";

const login: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
    const { email } = req.body as BaseUser;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/

    if (!email) {
        res.status(400).json({ message: "Email is a required attribute" });
        return;
    }

    if (typeof email !== 'string' || email.length < 6 || email.length > 128 || !email.match(emailPattern)) {
        res.status(400).json({ message: "Email must be a valid format" });
        return;
    }

    next();
}

const registration: RequestHandler = (req, res, next) => {
    const { name, email } = req.body as BaseUser;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/

    if (!name) {
        res.status(400).json({ message: "Name is a required attribute" });
        return;
    }

    if (typeof name !== 'string' || name.length < 2 || name.length > 64) {
        res.status(400).json({ message: "Name must be between 2 and 64 characters" });
        return;
    }

    if (!email) {
        res.status(400).json({ message: "Email is a required attribute" });
        return;
    }

    if (typeof email !== 'string' || email.length < 6 || email.length > 128 || !email.match(emailPattern)) {
        res.status(400).json({ message: "Email must be a valid format" });
        return;
    }

    next();
}

const verify: RequestHandler = (req, res, next) => {
    const { token, type } = req.query as { token: string; type: string }

    const VALID_TYPES = ['verification', 'login'];

    if (!token || typeof token !== "string" || token.startsWith('ey')) {
        res.status(400).json({ message: "Missing 'token' query parameter or it is not a valid jwt" });
        return;
    }

    if (!type || typeof type !== "string" || !VALID_TYPES.includes(type)) {
        res.status(400).json({ message: "Missing 'type' query parameter or it is not a permitted type (requires 'verification' or 'login')" });
        return;
    }

    next();
}

export default {
    login,
    registration,
    verify
}