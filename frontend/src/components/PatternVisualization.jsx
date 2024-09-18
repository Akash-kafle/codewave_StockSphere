import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

// Sample function to fetch anomaly data based on alert ID
const fetchAnomalyData = (alertId) => {
  // Replace with your data fetching logic
  return [
    // Example data, replace with actual anomaly data
    { date: "2023-09-01", price: 145.23, volume: 3220000 },
    { date: "2023-09-02", price: 148.12, volume: 3050000 },
  ];
};

const PatternVisualization = () => {
  const [anomalyData, setAnomalyData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const alertId = queryParams.get("alertId");

  useEffect(() => {
    if (alertId) {
      const data = fetchAnomalyData(alertId);
      setAnomalyData(data);
    }
  }, [alertId]);

  return (
    <div className="flex flex-col p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Anomaly Visualization
      </h1>
      <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Anomaly Details for Alert {alertId}
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={anomalyData}>
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
              dataKey="volume"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatternVisualization;
