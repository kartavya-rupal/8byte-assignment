import axios from "axios";
import * as cheerio from "cheerio";

export const fetchGoogleMetrics = async (symbol) => {
    try {
        const url = `https://www.google.com/finance/quote/${symbol}:NSE`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const peRatio =
            $('div[data-testid="pe-ratio"]').text() || "N/A";

        const earnings =
            $('div[data-testid="earnings"]').text() || "N/A";

        return { peRatio, earnings };
    } catch {
        return {
            peRatio: "N/A",
            earnings: "N/A",
        };
    }
};
