export interface PortfolioStock {
    name: string;
    symbol: string;
    sector: string;
    exchange: string;

    purchasePrice: number;
    quantity: number;

    cmp: number;
    investment: number;
    presentValue: number;
    gainLoss: number;

    peRatio: string;
    earnings: string;

    fetchedAt: Date;
}
