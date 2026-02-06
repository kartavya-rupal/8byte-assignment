import { readPortfolioExcel } from "../services/excel.services.js";
import { fetchGoogleMetrics } from "../services/google.services.js";
import { fetchCMP } from "../services/yahoo.services.js";

export const getPortfolio = async (req, res) => {
    try {
        const stocks = readPortfolioExcel();
        const enrichedStocks = await Promise.all(
            stocks.map(async (stock) => {
                const [cmp, metrics] = await Promise.all([
                    fetchCMP(stock.symbol),
                    fetchGoogleMetrics(stock.symbol),
                ]);
                return {
                    ...stock,
                    cmp,
                    investment: stock.purchasePrice * stock.quantity,
                    presentValue: cmp ? cmp * stock.quantity : null,
                    gainLoss: cmp
                        ? cmp * stock.quantity -
                        stock.purchasePrice * stock.quantity
                        : null,
                    peRatio: metrics?.peRatio ?? "N/A",
                    earnings: metrics?.earnings ?? "N/A",
                    fetchedAt: Date.now(),
                };
            })
        );
        res.json(enrichedStocks);
    } catch (err) {
        console.error("❌ Backend error:", err);
        res.status(500).json({ error: "Failed to build portfolio" });
    }
};
