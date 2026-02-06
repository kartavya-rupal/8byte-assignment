import axios from "axios";
import * as cheerio from "cheerio";

export const fetchGoogleMetrics = async (symbol) => {
    try {
        const url = `https://www.google.com/finance/quote/${symbol}:NSE`;

        const { data } = await axios.get(url, {
            timeout: 5000,
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });

        const $ = cheerio.load(data);

        const peRatio =
            $('div[data-testid="pe-ratio"]').text().trim() || "N/A";

        const earnings =
            $('div[data-testid="earnings"]').text().trim() || "N/A";

        return { peRatio, earnings };
    } catch {
        return { peRatio: "N/A", earnings: "N/A" };
    }
};
