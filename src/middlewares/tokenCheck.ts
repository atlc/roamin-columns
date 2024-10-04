import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import config from "../config";
import { Payload } from "../types";

export const tokenCheck: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).json({ message: "Missing auth headers" });
        return;
    }

    const [type, token] = authHeader.split(' ');

    if (!token || !type || type.toLowerCase() !== "bearer") {
        res.status(401).json({ message: "Invalid auth header format" });
        return;
    }

    jwt.verify(token, config.jwt.secret, async (err, payload) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }

        req.user = payload as Payload;
        next();
    });
}