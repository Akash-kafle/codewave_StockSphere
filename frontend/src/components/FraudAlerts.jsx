import React from "react";
import { Link } from "react-router-dom";

const FraudAlerts = () => {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Fraud Alerts
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg mb-4 text-gray-700">
            Here you will find a summary of recent fraud alerts detected in the
            stock market.
          </p>
          <table className="w-full border-collapse bg-gray-50">
            <thead>
              <tr>
                <th className="p-3 border-b border-gray-300 text-left text-gray-600">
                  Alert ID
                </th>
                <th className="p-3 border-b border-gray-300 text-left text-gray-600">
                  Stock Symbol
                </th>
                <th className="p-3 border-b border-gray-300 text-left text-gray-600">
                  Alert Type
                </th>
                <th className="p-3 border-b border-gray-300 text-left text-gray-600">
                  Date
                </th>
                <th className="p-3 border-b border-gray-300 text-left text-gray-600">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-300">001</td>
                <td className="p-3 border-b border-gray-300">AAPL</td>
                <td className="p-3 border-b border-gray-300">Price Anomaly</td>
                <td className="p-3 border-b border-gray-300">2024-09-18</td>
                <td className="p-3 border-b border-gray-300">
                  <Link
                    to="/pattern-visualization?alertId=001"
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-300">002</td>
                <td className="p-3 border-b border-gray-300">GOOGL</td>
                <td className="p-3 border-b border-gray-300">Pump and Dump</td>
                <td className="p-3 border-b border-gray-300">2024-09-17</td>
                <td className="p-3 border-b border-gray-300">
                  <Link
                    to="/pattern-visualization?alertId=002"
                    className="text-blue-500 hover:underline"
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
