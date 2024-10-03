import express from 'express';
import apiRouter from './api'
import authRouter from './auth'
import { tokenCheck } from '../middlewares/tokenCheck';

const router = express.Router();

router.use('/api', tokenCheck, apiRouter);
router.use('/auth', authRouter);

export default router;