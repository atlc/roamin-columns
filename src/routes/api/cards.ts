import express from 'express';
import db from '../../db';
import validators from '../../validators';

const router = express.Router();

router.post('/', validators.cards.isCreatableCard, async (req, res, next) => {
    const { title, description, columnId, dueAt } = req.body;
    const userId = req.user.id;

    db.cards.create({ title, description, columnId, dueAt }, userId)
        .then(results => res.status(201).json({ message: "Successfully created card!", id: results.id }))
        .catch(next)
});

router.put('/:id/move', validators.cards.isMoveable, (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { columnId } = req.body;

    db.cards.update.column({ id, columnId }, userId)
        .then(results => res.status(201).json({ message: "Successfully moved card!" }))
        .catch(next)
});

router.put('/:id/redate', validators.cards.isRedateable, (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { dueAt } = req.body;

    db.cards.update.dueDate({ dueAt, id }, userId)
        .then(results => res.status(201).json({ message: "Successfully updated card!" }))
        .catch(next)
})

router.put('/:id/redescribe', validators.cards.isRedescribeable, (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { description } = req.body;

    db.cards.update.description({ description, id }, userId)
        .then(results => res.status(201).json({ message: "Successfully updated card!" }))
        .catch(next)
})

router.put('/:id/title', validators.cards.isRetitleeable, (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { title } = req.body;

    db.cards.update.title({ title, id }, userId)
        .then(results => res.status(201).json({ message: "Successfully updated card!" }))
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;

    db.columns.destroy({ id }, userId)
        .then(results => res.status(200).json({ message: "Successfully deleted card!" }))
        .catch(next)
});

export default router;