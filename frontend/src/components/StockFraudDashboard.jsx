import React, { useState, useEffect } from "react";
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
import stockDataJson from "../assets/stockData.json"; 

const StockFraudDetectionDashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [symbol, setSymbol] = useState("AAPL");
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchSymbols = () => {
      // Extract unique symbols from the stockDataJson
      const uniqueSymbols = Array.from(
        new Set(stockDataJson.map((data) => data.symbol))
      );
      setSymbols(uniqueSymbols);
    };

    fetchSymbols();
  }, []);

  useEffect(() => {
    const fetchStockData = () => {
      const filteredData = stockDataJson.filter(
        (data) => data.symbol.toUpperCase() === symbol.toUpperCase()
      );
      const dataWithSMA = calculateMovingAverage(filteredData, "price", 5); // 5-period moving average
      setStockData(dataWithSMA);
    };

    fetchStockData();
  }, [symbol]);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.trim().toUpperCase()); // Ensure symbol is in uppercase and trimmed
  };

  const calculateMovingAverage = (data, key, period) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (i >= period - 1) {
        const slice = data.slice(i - period + 1, i + 1);
        const average =
          slice.reduce((sum, item) => sum + item[key], 0) / period;
        result.push({ ...data[i], [`${key}SMA`]: average });
      } else {
        result.push(data[i]);
      }
    }
    return result;
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Fraud Busters</h1>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="flex gap-2">
          <select
            value={symbol}
            onChange={handleSymbolChange}
            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">Stock Price</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="priceSMA"
                stroke="#ff7300"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">Trading Volume</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">Value Table</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b border-gray-300">Date</th>
              <th className="text-left p-3 border-b border-gray-300">Price</th>
              <th className="text-left p-3 border-b border-gray-300">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((data, index) => (
              <tr key={index}>
                <td className="p-3 border-b border-gray-300">{data.date}</td>
                <td className="p-3 border-b border-gray-300">
                  ${data.price.toFixed(2)}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {data.volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockFraudDetectionDashboard;
