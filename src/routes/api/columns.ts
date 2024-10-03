import express from 'express';
import db from '../../db';
import validators from '../../validators';

const router = express.Router();

router.post('/', validators.columns.hasValidName, validators.columns.hasBoardId, async (req, res, next) => {
    const { name, boardId } = req.body;
    const userId = req.user.id;

    db.columns.create({ name, boardId }, userId)
        .then(results => res.status(201).json({ message: "Successfully created column!", id: results.id }))
        .catch(next)
});

router.put('/:id/rename', validators.columns.hasValidName, async (req, res, next) => {
    const { name } = req.body;
    const id = req.params.id;
    const userId = req.user.id;

    db.columns.rename({ name, id }, userId)
        .then(results => res.status(201).json({ message: "Successfully updated column!" }))
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;

    db.columns.destroy({ id }, userId)
        .then(results => res.status(200).json({ message: "Successfully deleted column!" }))
        .catch(next)
});

export default router;