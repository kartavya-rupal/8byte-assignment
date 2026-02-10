import { readPortfolioExcel } from "../services/excel.services.js";
import { fetchGoogleMetrics } from "../services/google.services.js";
import { fetchCMP } from "../services/yahoo.services.js";
import NodeCache from "node-cache";

const portfolioCache = new NodeCache({ stdTTL: 300 }); 

export const getPortfolio = async (req, res) => {
    try {
        const cachedData = portfolioCache.get("portfolio");
        if (cachedData) {
            return res.json(cachedData);
        }

        const stocks = readPortfolioExcel();

        const enrichedStocks = await Promise.all(
            stocks.map(async (stock) => {
                let cmp = null;
                let metrics = { peRatio: "N/A", earnings: "N/A" };

                try {
                    const [price, googleData] = await Promise.all([
                        fetchCMP(stock.symbol),
                        fetchGoogleMetrics(stock.symbol),
                    ]);

                    cmp = price;
                    if (googleData) {
                        metrics = googleData;
                    }
                } catch {
                }

                return {
                    ...stock,
                    cmp,
                    investment: stock.purchasePrice * stock.quantity,
                    presentValue: cmp ? cmp * stock.quantity : null,
                    gainLoss: cmp
                        ? cmp * stock.quantity -
                        stock.purchasePrice * stock.quantity
                        : null,
                    peRatio: metrics.peRatio || "N/A",
                    earnings: metrics.earnings || "N/A",
                };
            })
        );

        portfolioCache.set("portfolio", enrichedStocks);
        res.json(enrichedStocks);
    } catch {
        res.status(500).json({ error: "Failed to build portfolio" });
    }
};
