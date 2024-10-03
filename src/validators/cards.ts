import { RequestHandler } from "express";

const hasInvalidTitle = (title: string) => !title || typeof title !== "string" || title.length < 3 || title.length > 64
const hasInvalidDescription = (description: string) => !description || typeof description !== "string" || description.length > 1024
const hasInvalidColumnId = (columnId: string) => !columnId || typeof columnId !== "string" || columnId.length !== 36
const hasInvalidDueAt = (dueAt: Date) => new Date(dueAt).toString() === "Invalid Date"

const isCreatableCard: RequestHandler = (req, res, next) => {
    const { title, description, columnId, dueAt } = req.body;

    if (hasInvalidTitle(title)) {
        res.status(400).json({ message: "'title' is a required field and must be between 3 and 64 characters" });
        return;
    }

    if (description && hasInvalidDescription(description)) {
        res.status(400).json({ message: "Description cannot be longer than 1,024 characters" });
        return;
    }

    if (hasInvalidColumnId(columnId)) {
        res.status(400).json({ message: "'columnId' is a required field and must be a valid 36 digit UUID" });
        return;
    }

    if (dueAt && hasInvalidDueAt(dueAt)) {
        res.status(400).json({ message: "'dueAt' is an invalid date format" });
        return;
    }

    next();
}

const isMoveable: RequestHandler = (req, res, next) => {
    const { columnId } = req.body;

    if (hasInvalidColumnId(columnId)) {
        res.status(400).json({ message: "'columnId' is a required field and must be a valid 36 digit UUID" });
        return;
    }

    next();
}

const isRedateable: RequestHandler = (req, res, next) => {
    const { dueAt } = req.body;

    if (hasInvalidDueAt(dueAt)) {
        res.status(400).json({ message: "'dueAt' is an invalid date format" });
        return;
    }

    next();
}

const isRedescribeable: RequestHandler = (req, res, next) => {
    const { description } = req.body;

    if (hasInvalidDescription(description)) {
        res.status(400).json({ message: "Description cannot be longer than 1,024 characters" });
        return;
    }

    next();
}

const isRetitleable: RequestHandler = (req, res, next) => {
    const { title } = req.body;

    if (hasInvalidTitle(title)) {
        res.status(400).json({ message: "'title' is a required field and must be between 3 and 64 characters" });
        return;
    }

    next();
}

export default {
    isCreatableCard,
    isMoveable,
    isRedateable,
    isRedescribeable,
    isRetitleeable: isRetitleable
}