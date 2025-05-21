import express from 'express';
import { getCryptoData, getCryptoDataById } from '../controllers/crypto.controller.js';

const router = express.Router();

router.get('/get-all', getCryptoData);
router.get('/:id', getCryptoDataById);

export default router;