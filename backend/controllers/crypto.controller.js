import express from "express";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const CMC_API_KEY = process.env.CMC_API_KEY
const CMC_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';

router.get("/cryptos", async (req, res) => {
  try {
    const response = await axios.get(
      `${CMC_API_URL}/listings/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": CMC_API_KEY,
        },
        params: {
          start: 1,
          limit: 10,
          convert: "USD",
        },
      }
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;