import { readPortfolioExcel } from "../services/excel.services.js";
import { fetchGoogleMetrics } from "../services/google.services.js";
import { fetchCMP } from "../services/yahoo.services.js";

export const getPortfolio = async (req, res) => {
    try {
        const stocks = readPortfolioExcel();
        const enrichedStocks = [];

        for (const stock of stocks) {
            let cmp = null;
            let metrics = { peRatio: "N/A", earnings: "N/A" };

            try {
                cmp = await fetchCMP(stock.symbol);
                metrics = await fetchGoogleMetrics(stock.symbol);
            } catch (err) {
                console.error(`Failed to fetch metrics for symbol ${stock.symbol}:`, err);
            }

            enrichedStocks.push({
                ...stock,
                cmp,
                investment: stock.purchasePrice * stock.quantity,
                presentValue: cmp ? cmp * stock.quantity : null,
                gainLoss: cmp
                    ? cmp * stock.quantity -
                    stock.purchasePrice * stock.quantity
                    : null,
                peRatio: metrics.peRatio ?? "N/A",
                earnings: metrics.earnings ?? "N/A",
                fetchedAt: Date.now(),
            });
        }

        res.json(enrichedStocks);
    } catch (err) {
        res.status(500).json({ error: "Failed to build portfolio" });
    }
};
