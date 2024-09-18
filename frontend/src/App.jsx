import React, { useEffect } from "react";
import StockFraudDashboard from "./components/StockFraudDashboard";
import { Route, Routes } from "react-router-dom";
import FraudAlerts from "./components/FraudAlerts";
import PatternVisualization from "./components/PatternVisualization";
import { notification } from "antd";
import "antd/dist/reset.css"; // Ensure you include Ant Design's CSS

import Sidebar from "./components/Sidebar";
import { StockDataProvider } from "./context/StockDataContext";

function App() {
  const openNotification = () => {
    notification.open({
      message: "Anomalies Detected",
      description: "",
    });
  };

  useEffect(() => {
    openNotification();
  }, []);

  return (
    <>
      {" "}
      <StockDataProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<StockFraudDashboard />} />
            <Route path="/fraudalerts" element={<FraudAlerts />} />
            <Route
              path="/patternvisualization"
              element={<PatternVisualization />}
            />
          </Routes>
        </div>
        <Sidebar />
      </StockDataProvider>
    </>
  );
}

export default App;
