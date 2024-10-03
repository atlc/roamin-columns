import { RequestHandler } from "express";

const hasBoardId: RequestHandler = (req, res, next) => {
    const { boardId } = req.body;

    if (!boardId || typeof boardId !== "string" || boardId.length !== 36) {
        res.status(400).json({ message: "'boardId' is a required field and must be a valid 36 digit UUID" });
        return;
    }

    next();
}

const hasValidName: RequestHandler = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.length < 3 || name.length > 64) {
        res.status(400).json({ message: "'Name' is a required field and must be between 3 and 64 characters" });
        return;
    }

    next();
}


export default {
    hasBoardId,
    hasValidName
}