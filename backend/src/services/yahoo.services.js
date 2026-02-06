import axios from "axios";
import { cache } from "../utils/cache.js";

const getYahooPrice = async (symbol) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

    const response = await axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    });

    return (
        response.data?.chart?.result?.[0]?.meta
            ?.regularMarketPrice || null
    );
};

export const fetchCMP = async (symbol) => {
    if (!symbol) return null;

    const cached = cache.get(symbol);
    if (cached !== undefined) {
        return cached;
    }

    let price = null;

    try {
        price = await getYahooPrice(`${symbol}.NS`);
        if (price === null) {
            price = await getYahooPrice(`${symbol}.BO`);
        }
    } catch {
        price = null;
    }

    cache.set(symbol, price);
    return price;
};
