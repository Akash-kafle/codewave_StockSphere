import React, { useEffect } from "react";
import StockFraudDashboard from "./components/StockFraudDashboard";
import { Route, Routes } from "react-router-dom";
import News from "./components/News";

import { notification } from "antd";
import "antd/dist/reset.css"; // Ensure you include Ant Design's CSS
import Chatbot from "./components/ChatBot";
import Sidebar from "./components/Sidebar";
import { StockDataProvider } from "./context/StockDataContext";

function App() {
    // const openNotification = () => {
    //   notification.open({
    //     message: "Anomalies Detected",
    //     description: "",
    //   });
    // };

    // useEffect(() => {
    //   openNotification();
    // }, []);

  return (
    <>
      {" "}
      <StockDataProvider>

        <div className="App">
          <Routes>
            <Route path="/" element={<StockFraudDashboard />} />
            <Route path="/news" element={<News/>} />
          
          </Routes>
        </div>
        <Chatbot />
        <Sidebar />
 
      </StockDataProvider>
    </>
  );
}

export default App;
