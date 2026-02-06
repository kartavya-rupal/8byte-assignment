import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readPortfolioExcel = () => {
    const filePath = path.join(__dirname, "../data/portfolio.xlsx");

    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });

    const stocks = rows
        .filter((row) => {
            return (
                row.__EMPTY_1 &&
                row.__EMPTY_2 &&
                row.__EMPTY_3 &&
                row.__EMPTY_6
            );
        })
        .map((row) => ({
            name: String(row.__EMPTY_1).trim(),
            symbol: String(row.__EMPTY_6).trim(),
            purchasePrice: Number(row.__EMPTY_2),
            quantity: Number(row.__EMPTY_3),
            exchange: "NSE",
            sector: "Auto-derived",
        }));

    return stocks;
};
