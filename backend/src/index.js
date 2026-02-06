import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/portfolio", portfolioRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
