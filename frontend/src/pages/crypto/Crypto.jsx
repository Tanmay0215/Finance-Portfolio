import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArrowUpIcon = () => <span className="text-green-500">▲</span>;
const ArrowDownIcon = () => <span className="text-red-500">▼</span>;
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Crypto = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/crypto/get-all`);
      setPortfolioData(response.data.data);
    } catch (err) {
      console.error("Error fetching portfolio data:", err);
      setError(err.message || 'Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-4">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-400 p-4 text-center">
        <p className="text-2xl font-semibold mb-2">Oops! Something went wrong.</p>
        <p>Error loading portfolio: {error}</p>
        <p className="mt-4 text-sm text-gray-500">Please check your connection or try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Price (USD)
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    24h Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {portfolioData.map((crypto) => {
                  const price = parseFloat(crypto.quote.USD.price);
                  const change24h = parseFloat(crypto.quote.USD.percent_change_24h);
                  const isPositiveChange = change24h >= 0;

                  return (
                    <tr key={crypto.id} className="hover:bg-gray-700/70 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* Placeholder for crypto icon - could use a library or dynamic image source */}
                          {/* <img className="h-8 w-8 rounded-full mr-3" src={`path/to/icons/${crypto.symbol.toLowerCase()}.png`} alt="" /> */}
                          <div className="text-sm font-medium text-gray-100">{crypto.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{crypto.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                        <div className="flex items-center">
                          {isPositiveChange ? <ArrowUpIcon /> : <ArrowDownIcon />}
                          <span className="ml-1.5">{change24h.toFixed(2)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default Crypto;
