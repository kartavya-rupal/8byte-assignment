import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio.routes.js";
import { PORT } from "./config/constants.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/portfolio", portfolioRoutes);

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
