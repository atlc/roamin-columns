import { RequestHandler } from "express";

const hasValidName: RequestHandler = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.length < 3 || name.length > 64) {
        res.status(400).json({ message: "'Name' is a required field and must be between 3 and 64 characters" });
        return;
    }

    next();
}

export default {
    hasValidName
}