"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPortfolio } from "@/services/portfolio.api";
import { PortfolioStock } from "@/types/porfolio";
import { groupBySector } from "@/utils/calculations";
import SectorSummary from "./SectorSummary";

export default function PortfolioTable() {
    const [stocks, setStocks] = useState<PortfolioStock[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const isFetching = useRef(false);

    const loadData = async (isBackground = false) => {
        if (isFetching.current) return;

        try {
            isFetching.current = true;
            if (!isBackground) setLoading(true);
            if (isBackground) setRefreshing(true);

            const data = await fetchPortfolio();
            setStocks(data);
            setError(null);
        } catch {
            setError("Failed to load portfolio data");
        } finally {
            isFetching.current = false;
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadData();

        const interval = setInterval(() => {
            loadData(true);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    if (loading && stocks.length === 0) {
        return (
            <div className="text-center py-10 space-y-2">
                <p className="text-gray-600">
                    Loading portfolio data…
                </p>
                <p className="text-sm text-gray-400">
                    Fetching live stock prices and fundamentals. This may take a few seconds.
                </p>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-600 text-center py-8">{error}</p>;
    }

    const grouped = groupBySector(stocks);

    return (
        <div className="space-y-8">
            {refreshing && (
                <p className="text-sm text-gray-400 text-center">
                    Updating latest market data…
                </p>
            )}

            {Object.entries(grouped).map(([sector, sectorStocks]) => (
                <div key={sector}>
                    <SectorSummary sector={sector} stocks={sectorStocks} />

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="text-left px-4 py-3 font-semibold">Stock</th>
                                    <th className="text-left px-4 py-3 font-semibold">CMP</th>
                                    <th className="text-left px-4 py-3 font-semibold">Qty</th>
                                    <th className="text-left px-4 py-3 font-semibold">Investment</th>
                                    <th className="text-left px-4 py-3 font-semibold">Present Value</th>
                                    <th className="text-left px-4 py-3 font-semibold">Gain/Loss</th>
                                    <th className="text-left px-4 py-3 font-semibold">P/E</th>
                                    <th className="text-left px-4 py-3 font-semibold">Earnings</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sectorStocks.map((stock) => (
                                    <tr
                                        key={`${stock.symbol}-${stock.fetchedAt ?? ""}`}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">{stock.name}</td>
                                        <td className="px-4 py-3">{stock.cmp ?? "—"}</td>
                                        <td className="px-4 py-3">{stock.quantity}</td>
                                        <td className="px-4 py-3">₹{stock.investment}</td>
                                        <td className="px-4 py-3">
                                            {stock.presentValue !== null
                                                ? `₹${stock.presentValue}`
                                                : "—"}
                                        </td>
                                        <td
                                            className={`px-4 py-3 font-semibold ${stock.gainLoss === null
                                                    ? "text-gray-400"
                                                    : stock.gainLoss >= 0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                        >
                                            {stock.gainLoss !== null
                                                ? `₹${stock.gainLoss}`
                                                : "—"}
                                        </td>
                                        <td className="px-4 py-3">{stock.peRatio ?? "N/A"}</td>
                                        <td className="px-4 py-3">{stock.earnings ?? "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
