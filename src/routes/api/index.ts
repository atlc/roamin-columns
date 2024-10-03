import express from 'express';
import boardsRouter from './boards';
import cardsRouter from './cards';
import columnsRouter from './columns';

const router = express.Router();

router.use('/boards', boardsRouter);
router.use('/cards', cardsRouter);
router.use('/columns', columnsRouter);

export default router;