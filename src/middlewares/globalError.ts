import { ErrorRequestHandler } from 'express';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message || JSON.stringify(err) })
}