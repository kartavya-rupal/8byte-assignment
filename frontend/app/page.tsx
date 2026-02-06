import PortfolioTable from "@/components/PortfolioTable";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Portfolio Dashboard</h1>
        <PortfolioTable />
      </div>
    </main>
  );
}
