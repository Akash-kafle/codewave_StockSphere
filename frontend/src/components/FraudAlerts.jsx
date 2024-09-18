import React from "react";
import { Link } from "react-router-dom";

const FraudAlerts = () => {
  return (
    <div className="flex h-screen bg-[#F5F7FA]">
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#333333]">
          Fraud Alerts
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-lg mb-4 text-[#555555]">
            Here you will find a summary of recent fraud alerts detected in the
            stock market.
          </p>
          <table className="w-full border-collapse bg-gray-50">
            <thead>
              <tr>
                <th className="p-3 border-b border-[#E0E0E0] text-left text-[#333333]">
                  Alert ID
                </th>
                <th className="p-3 border-b border-[#E0E0E0] text-left text-[#333333]">
                  Stock Symbol
                </th>
                <th className="p-3 border-b border-[#E0E0E0] text-left text-[#333333]">
                  Alert Type
                </th>
                <th className="p-3 border-b border-[#E0E0E0] text-left text-[#333333]">
                  Date
                </th>
                <th className="p-3 border-b border-[#E0E0E0] text-left text-[#333333]">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-[#E0E0E0]">001</td>
                <td className="p-3 border-b border-[#E0E0E0]">AAPL</td>
                <td className="p-3 border-b border-[#E0E0E0]">Price Anomaly</td>
                <td className="p-3 border-b border-[#E0E0E0]">2024-09-18</td>
                <td className="p-3 border-b border-[#E0E0E0]">
                  <Link
                    to="/pattern-visualization?alertId=001"
                    className="text-[#4A90E2] hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-[#E0E0E0]">002</td>
                <td className="p-3 border-b border-[#E0E0E0]">GOOGL</td>
                <td className="p-3 border-b border-[#E0E0E0]">Volume Spike</td>
                <td className="p-3 border-b border-[#E0E0E0]">2024-09-17</td>
                <td className="p-3 border-b border-[#E0E0E0]">
                  <Link
                    to="/pattern-visualization?alertId=002"
                    className="text-[#4A90E2] hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default FraudAlerts;
