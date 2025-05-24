// StockOverview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CRYPTOS = ["BTC", "ETH", "BNB", "SOL", "ADA"];

const StockOverview = () => {
  const [data, setData] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/crypto/cryptos`);
        setData(res.data.filter((c) => CRYPTOS.includes(c.symbol)));
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      }
    };
    fetchCryptos();
  }, [BACKEND_URL]);

  return (
    <div className="bg-[#151c2c] min-h-screen p-6 text-white font-sans">
      <h1 className="text-4xl font-bold mb-6">Crypto Market Situation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Portfolio Overview */}
        <div className="bg-[#232b42] rounded-xl p-6 shadow flex-1">
          <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.map((crypto) => (
              <div key={crypto.id} className="bg-[#1b2233] rounded-lg p-4 flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold mr-4 uppercase">
                  {crypto.symbol[0]}
                </div>
                <div>
                  <div className="font-semibold">{crypto.name}</div>
                  <div className="text-sm text-gray-400">{crypto.symbol}</div>
                  <div className="font-bold text-green-400">
                    ${crypto.quote.USD.price.toFixed(2)}
                  </div>
                  <div className={`text-xs ${crypto.quote.USD.percent_change_24h > 0 ? "text-green-400" : "text-red-400"}`}>
                    {crypto.quote.USD.percent_change_24h > 0 ? "+" : ""}
                    {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Portfolio Value (placeholder) */}
        <div className="bg-[#232b42] rounded-xl p-6 shadow flex-1 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4"> Market Overview</h2>
          <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center text-2xl font-bold mb-4">
            ${data.reduce((acc, c) => acc + parseFloat(c.crypto.quote.USD.price || 0), 0).toFixed(2)}
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 px-3 py-1 rounded text-xs font-bold">1M</button>
            <button className="bg-[#1b2233] px-3 py-1 rounded text-xs">1D</button>
            <button className="bg-[#1b2233] px-3 py-1 rounded text-xs">1W</button>
            <button className="bg-[#1b2233] px-3 py-1 rounded text-xs">3M</button>
            <button className="bg-[#1b2233] px-3 py-1 rounded text-xs">1Y</button>
          </div>
        </div>
      </div>
      {/* Lower grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Watchlist */}
        <div className="bg-[#232b42] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Watchlist</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left">Symbol</th>
                <th className="text-left">Price</th>
                <th className="text-left">Change</th>
              </tr>
            </thead>
            <tbody>
              {data.map((crypto) => (
                <tr key={crypto.id}>
                  <td className="py-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase">
                      {crypto.symbol[0]}
                    </span>
                    {crypto.symbol}
                  </td>
                  <td>${crypto.quote.USD.price.toFixed(2)}</td>
                  <td className={crypto.quote.USD.percent_change_24h > 0 ? "text-green-400" : "text-red-400"}>
                    {crypto.quote.USD.percent_change_24h > 0 ? "+" : ""}
                    {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Top Gainers */}
        <div className="bg-[#232b42] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Top Gainers</h2>
          {data
            .filter((c) => c.quote.USD.percent_change_24h > 0)
            .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
            .slice(0, 3)
            .map((crypto) => (
              <div key={crypto.id} className="mb-3">
                <div className="font-bold">{crypto.symbol}</div>
                <div className="text-green-400 text-sm">
                  +{crypto.quote.USD.percent_change_24h.toFixed(2)}%
                </div>
              </div>
            ))}
        </div>
        {/* Losers */}
        <div className="bg-[#232b42] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Losers</h2>
          {data
            .filter((c) => c.quote.USD.percent_change_24h < 0)
            .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
            .slice(0, 3)
            .map((crypto) => (
              <div key={crypto.id} className="mb-3">
                <div className="font-bold">{crypto.symbol}</div>
                <div className="text-red-400 text-sm">
                  {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Transaction History (placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#232b42] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left">Type</th>
                <th className="text-left">Symbol</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((crypto, i) => (
                <tr key={crypto.id}>
                  <td className={i % 2 === 0 ? "text-green-400" : "text-red-400"}>
                    {i % 2 === 0 ? "Buy" : "Sell"}
                  </td>
                  <td>{crypto.symbol}</td>
                  <td>1</td>
                  <td>${crypto.quote.USD.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-[#232b42] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left">Type</th>
                <th className="text-left">Symbol</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((crypto, i) => (
                <tr key={crypto.id + "_2"}>
                  <td className={i % 2 === 0 ? "text-green-400" : "text-red-400"}>
                    {i % 2 === 0 ? "Buy" : "Sell"}
                  </td>
                  <td>{crypto.symbol}</td>
                  <td>1</td>
                  <td>${crypto.quote.USD.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockOverview;