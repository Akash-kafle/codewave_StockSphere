import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StockDataContext = createContext();

export const StockDataProvider = ({ children }) => {
  const [stockData, setStockData] = useState([]);
  const [stockSymbols, setStockSymbols] = useState([]); // New state for stock symbols
  const [selectedSymbol, setSelectedSymbol] = useState("ACLBSL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stock data from backend when the selected symbol changes
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/algorithms/stocks/${selectedSymbol}/`
        );
        setStockData(response.data);
        console.log("Stock data fetched successfully:", response.data);
      } catch (error) {
        setError("Error fetching stock data.");
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [selectedSymbol]);

  useEffect(() => {
    // Fetch all stock symbols from backend
    const fetchStockSymbols = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/algorithms/stocks/`
        );
        setStockSymbols(response.data);
        console.log("Stock symbols fetched successfully:", response.data);
      } catch (error) {
        setError("Error fetching stock symbols.");
        console.error("Error fetching stock symbols:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockSymbols();
  }, []); // Fetch stock symbols only once when the component mounts

  return (
    <StockDataContext.Provider
      value={{ stockData, stockSymbols, setSelectedSymbol, loading, error }}
    >
      {children}
    </StockDataContext.Provider>
  );
};
