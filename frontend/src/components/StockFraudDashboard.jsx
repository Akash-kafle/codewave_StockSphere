import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StockDataContext } from "../context/StockDataContext";
import dayjs from "dayjs"; // For date formatting

const StockFraudDetectionDashboard = () => {
  const { stockData, stockSymbols, setSelectedSymbol, loading, error } =
    useContext(StockDataContext);

  const handleSymbolChange = (e) => {
    setSelectedSymbol(e.target.value.trim().toUpperCase());
  };

  // Format date for XAxis
  const formatDate = (tickItem) => dayjs(tickItem).format("YYYY-MM-DD");

  return (
    <div className="flex flex-col p-4 bg-[#F5F7FA]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#333333]">
        Fraud Busters
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="flex gap-2">
          <select
            onChange={handleSymbolChange}
            className="border border-[#E0E0E0] p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          >
            {stockSymbols.length > 0 ? (
              stockSymbols.map((symbol, index) => (
                <option key={index} value={symbol}>
                  {symbol}
                </option>
              ))
            ) : (
              <option value="">No symbols available</option>
            )}
          </select>
        </div>
      </form>

      {loading && <p className="text-center text-[#333333]">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {stockData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-[#333333]">
                Stock Price
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="TimeStamp" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip labelFormatter={formatDate} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="c" // Closing price
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-[#333333]">
                Trading Volume
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="TimeStamp" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip labelFormatter={formatDate} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="v" // Volume
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">
              Value Table
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b border-[#E0E0E0]">
                    Date
                  </th>
                  <th className="text-left p-3 border-b border-[#E0E0E0]">
                    Opening Price
                  </th>
                  <th className="text-left p-3 border-b border-[#E0E0E0]">
                    Highest Price
                  </th>
                  <th className="text-left p-3 border-b border-[#E0E0E0]">
                    Lowest Price
                  </th>
                  <th className="text-left p-3 border-b border-[#E0E0E0]">
                    Closing Price
                  </th>
                  <th className="text-left p-3 border-b border-[#E0E0E0]">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((data, index) => (
                  <tr key={index}>
                    <td className="p-3 border-b border-[#E0E0E0]">
                      {data.TimeStamp}
                    </td>
                    <td className="p-3 border-b border-[#E0E0E0]">
                      {data.o !== undefined
                        ? `NPR ${data.o.toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className="p-3 border-b border-[#E0E0E0]">
                      {data.h !== undefined
                        ? `NPR ${data.h.toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className="p-3 border-b border-[#E0E0E0]">
                      {data.l !== undefined
                        ? `NPR ${data.l.toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className="p-3 border-b border-[#E0E0E0]">
                      {data.c !== undefined
                        ? `NPR ${data.c.toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className="p-3 border-b border-[#E0E0E0]">
                      {data.v !== undefined ? data.v.toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        !loading && (
          <div className="text-center text-[#333333] mt-6">
            <p>No stock data available for the selected symbol.</p>
          </div>
        )
      )}
    </div>
  );
};

export default StockFraudDetectionDashboard;
