import React, { useEffect, useState } from 'react';
import api from '../../utils/api'; // Import the configured Axios instance
import { useNavigate } from 'react-router-dom';

const ArrowUpIcon = () => <span className="text-green-500">▲</span>;
const ArrowDownIcon = () => <span className="text-red-500">▼</span>;
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Crypto = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async () => {
    try {
      const response = await api.get('/api/crypto/get-all'); // Use api instance
      setPortfolioData(response.data);
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
                  #
                </th>
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
                  1h Change
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  24h Change
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  7D Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {portfolioData && portfolioData.map((crypto, index) => {
                const price = parseFloat(crypto.quote.USD.price);
                const change1h = parseFloat(crypto.quote.USD.percent_change_1h);
                const change24h = parseFloat(crypto.quote.USD.percent_change_24h);
                const change7d = parseFloat(crypto.quote.USD.percent_change_7d);
                const isPositiveChange = change1h >= 0;

                return (
                  <tr key={crypto.id} className="hover:bg-gray-700/70 transition-colors duration-150" onClick={() => navigate(`/crypto/${crypto.symbol}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-100">{crypto.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{crypto.symbol}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300  ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                      ${price.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                      <div className="flex items-center">
                        {isPositiveChange ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        <span className="ml-1.5">{change1h.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                      <div className="flex items-center">
                        {isPositiveChange ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        <span className="ml-1.5">{change24h.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300  ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositiveChange ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      <span className='ml-1.5'>
                        {change7d.toFixed(2)}%
                      </span>
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
