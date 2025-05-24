import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/cryptos", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "76a43e97-6e9d-4e78-a594-70cc94af5e85",
        },
        params: {
          start: 1,
          limit: 50,
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