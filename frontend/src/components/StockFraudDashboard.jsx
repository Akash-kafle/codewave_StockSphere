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
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { StockDataContext } from "../context/StockDataContext";
import dayjs from "dayjs"; // For date formatting
import {
  calculateRSI,
  calculateBollingerBands,
} from "../utils/technicalIndicators";

const StockFraudDetectionDashboard = () => {
  const { stockData, stockSymbols, setSelectedSymbol, loading, error } =
    useContext(StockDataContext);

  const handleSymbolChange = (e) => {
    setSelectedSymbol(e.target.value.trim().toUpperCase());
  };

  // Format date for XAxis
  const formatDate = (tickItem) => dayjs(tickItem).format("YYYY-MM-DD");

  // Function to calculate moving average
  const calculateMovingAverage = (data, period) => {
    return data.map((point, index, array) => {
      if (index < period - 1) return { ...point, ma: null };
      const subset = array.slice(index - period + 1, index + 1);
      const avg = subset.reduce((acc, curr) => acc + curr.c, 0) / period;
      return { ...point, ma: avg };
    });
  };

  const movingAverageData = calculateMovingAverage(stockData, 5);
  const rsiData = calculateRSI(stockData);
  const bollingerBandsData = calculateBollingerBands(stockData, 20);

  // Prepare the data for BarChart
  const processedData = stockData.map((entry) => ({
    ...entry,
    height: Math.abs(entry.c - entry.o), // Difference between closing and opening
    base: Math.min(entry.o, entry.c), // The minimum of opening or closing
    openValue: entry.o,
    closeValue: entry.c,
  }));
  return (
    <div className="flex flex-col p-4 bg-[#F5F7FA]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#333333]">
        Fraud Busters
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="flex flex-col md:flex-row gap-2">
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
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-[#333333]">
                Stock Price and Moving Average
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={movingAverageData}>
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
                    name="Closing Price"
                  />
                  <Line
                    type="monotone"
                    dataKey="ma" // Moving Average
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={false}
                    name="5-period Moving Average"
                    strokeDasharray="5 5"
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
                    name="Volume"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">
              RSI Indicator
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rsiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="TimeStamp" tickFormatter={formatDate} />
                <YAxis domain={[0, 100]} />
                <Tooltip labelFormatter={formatDate} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rsi" // RSI
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={false}
                  name="RSI"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-gray-700">
              <p>
                <strong>RSI Interpretation:</strong>
              </p>
              <ul className="list-disc ml-5">
                <li>
                  RSI above 70 may indicate that the stock is overbought and
                  could be due for a pullback.
                </li>
                <li>
                  RSI below 30 may indicate that the stock is oversold and could
                  be due for a bounce.
                </li>
                <li>
                  A rising RSI might signal a strengthening trend, while a
                  falling RSI could signal a weakening trend.
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">
              Bollinger Bands
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bollingerBandsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="TimeStamp" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={formatDate} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="middleBand" // Middle Band
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                  name="Middle Band"
                />
                <Line
                  type="monotone"
                  dataKey="upperBand" // Upper Band
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={false}
                  name="Upper Band"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="lowerBand" // Lower Band
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={false}
                  name="Lower Band"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-gray-700">
              <p>
                <strong>Bollinger Bands Interpretation:</strong>
              </p>
              <ul className="list-disc ml-5">
                <li>
                  Price touching the upper band may indicate the stock is
                  overbought and could be due for a correction.
                </li>
                <li>
                  Price touching the lower band may indicate the stock is
                  oversold and could be due for a rebound.
                </li>
                <li>
                  A band squeeze, where the bands come close together, could
                  signal a potential breakout or increased volatility.
                </li>
                <li>
                  A band expansion, where the bands widen, indicates increased
                  volatility and potential continuation of the current trend.
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">
              Candlestick Chart
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="TimeStamp" tickFormatter={formatDate} />
                <YAxis
                  domain={[
                    Math.min(...processedData.map((d) => d.base)),
                    "auto",
                  ]}
                />
                <Tooltip labelFormatter={formatDate} />

                {/* Bar for the range between opening and closing */}
                <Bar
                  dataKey="height"
                  fill="#8884d8"
                  barSize={10}
                  name="Price Change"
                  // Custom bar rendering if needed
                >
                  {processedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.openValue < entry.closeValue
                          ? "#4CAF50"
                          : "#F44336"
                      } // Color based on price change
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg shadow-lg p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">
              Value Table
            </h2>
            <div className="overflow-x-auto">
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
