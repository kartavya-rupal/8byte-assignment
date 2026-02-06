import { PortfolioStock } from "@/types/porfolio";
import { calculateSectorSummary } from "@/utils/calculations";

interface Props {
    sector: string;
    stocks: PortfolioStock[];
}

export default function SectorSummary({ sector, stocks }: Props) {
    const summary = calculateSectorSummary(stocks);

    return (
        <div className="bg-white p-6 border border-gray-200 rounded mb-4">
            <h2 className="font-semibold text-lg mb-4">
                {sector}
            </h2>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p className="text-gray-600 text-sm mb-1">Total Investment</p>
                    <p className="font-semibold">₹{summary.investment}</p>
                </div>
                <div>
                    <p className="text-gray-600 text-sm mb-1">Present Value</p>
                    <p className="font-semibold">₹{summary.presentValue}</p>
                </div>
                <div>
                    <p className="text-gray-600 text-sm mb-1">Gain/Loss</p>
                    <p className={`font-semibold ${summary.gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ₹{summary.gainLoss}
                    </p>
                </div>
            </div>
        </div>
    );
}
