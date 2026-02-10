import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/portfolio", portfolioRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
