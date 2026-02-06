import express from "express";
import { getPortfolio } from "../controllers/portfolio.controllers.js";

const router = express.Router();

router.get("/", getPortfolio);

export default router;
