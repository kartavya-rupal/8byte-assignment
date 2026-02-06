import { PortfolioStock } from "@/types/porfolio";

export const groupBySector = (stocks: PortfolioStock[]) => {
    const grouped: Record<string, PortfolioStock[]> = {};

    for (let i = 0; i < stocks.length; i++) {
        const stock = stocks[i];

        if (!grouped[stock.sector]) {
            grouped[stock.sector] = [];
        }

        grouped[stock.sector].push(stock);
    }

    return grouped;
};

export const calculateSectorSummary = (stocks: PortfolioStock[]) => {
    let investment = 0;
    let presentValue = 0;
    let gainLoss = 0;

    for (let i = 0; i < stocks.length; i++) {
        investment += stocks[i].investment;
        presentValue += stocks[i].presentValue;
        gainLoss += stocks[i].gainLoss;
    }

    return {
        investment,
        presentValue,
        gainLoss,
    };
};
