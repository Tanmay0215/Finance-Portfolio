import express from "express";
import { allCryptos, getCryptoById } from "../controllers/crypto.controller.js";

const router = express.Router();

router.get("/get-all", allCryptos);
router.get("/get/:id", getCryptoById);

export default router;