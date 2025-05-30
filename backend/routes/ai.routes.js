import express from 'express';
import { callGeminiAPI, getAIMarketOverview } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/', callGeminiAPI);
router.post('/market-overview', getAIMarketOverview);

export default router;
