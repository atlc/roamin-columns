import express from 'express';
import db from '../../db';
import validators from '../../validators';

const router = express.Router();

router.get('/profile', (req, res, next) => {
    db.users.profile(req.user.id)
        .then(boards => res.json(boards))
        .catch(next)
});

router.post('/', validators.boards.hasValidName, async (req, res, next) => {
    const { name } = req.body;
    const userId = req.user.id;

    db.boards.create({ name, userId })
        .then(results => res.status(201).json({ message: "Successfully created board!", id: results.id }))
        .catch(next)
});

router.put('/:id/rename', validators.boards.hasValidName, async (req, res, next) => {
    const { name } = req.body;
    const id = req.params.id;
    const userId = req.user.id;

    db.boards.rename({ name, id, userId })
        .then(results => res.status(201).json({ message: "Successfully updated board!" }))
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;

    db.boards.destroy({ id, userId })
        .then(results => res.status(200).json({ message: "Successfully deleted board!" }))
        .catch(next)
})

export default router;