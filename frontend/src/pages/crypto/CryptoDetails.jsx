import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const CryptoDetails = () => {
    const { id } = useParams();
    const [cryptoData, setCryptoData] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCryptoData = useCallback(async () => { // Wrapped in useCallback
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/api/crypto/get/${id}`);
            if (response.data?.data[id]) {
                setCryptoData(response.data.data[id]);
            } else {
                const crypto = response.data?.data ? Object.values(response.data.data).find(c => c.id.toString() === id) : null;
                if (crypto) {
                    setCryptoData(crypto);
                } else {
                    console.error('Crypto data not found for ID:', id, 'in response:', response.data);
                    setError('Crypto data not found.');
                }
            }
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            setError('Failed to fetch crypto data. Please try again later.');
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        fetchCryptoData();
    }, [fetchCryptoData]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-4">
                <LoadingSpinner />
                <p className="mt-4 text-lg">Loading cryptocurrency details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-400 p-4 text-center">
                <p className="text-2xl font-semibold mb-2">Oops! Something went wrong.</p>
                <p>{error}</p>
                <p className="mt-4 text-sm text-gray-500">Please check the ID or try again later.</p>
            </div>
        );
    }

    if (!cryptoData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-4">
                <p className="text-xl">No data available for this cryptocurrency.</p>
            </div>
        );
    }

    const { name, symbol, quote, circulating_supply, total_supply, description } = cryptoData;
    const usdQuote = quote.USD;

    const formatNumber = (num) => {
        if (num === null || num === undefined) return 'N/A';
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const formatPercentage = (num) => {
        if (num === null || num === undefined) return 'N/A';
        return num.toFixed(2) + '%';
    };

    return (
        <div className="bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="bg-gray-800 shadow-2xl rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white">{name} ({symbol})</h1>
                            {/* Placeholder for crypto logo - <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`} alt={name} className="w-8 h-8 mr-2 inline-block" /> */}
                        </div>
                        <div className={`text-2xl sm:text-3xl font-semibold text-blue-400 ${usdQuote.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${formatNumber(usdQuote.price)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                        <DetailCard title="Market Cap" value={`$${formatNumber(usdQuote.market_cap)}`} />
                        <DetailCard title="24h Volume" value={`$${formatNumber(usdQuote.volume_24h)}`} />
                        <DetailCard title="Fully Diluted Market Cap" value={`$${formatNumber(usdQuote.fully_diluted_market_cap)}`} />
                        <DetailCard title="Circulating Supply" value={`${formatNumber(circulating_supply)} ${symbol}`} />
                        <DetailCard title="Total Supply" value={`${formatNumber(total_supply)} ${symbol}`} />
                        <DetailCard title="Max Supply" value={cryptoData.max_supply ? `${formatNumber(cryptoData.max_supply)} ${symbol}` : 'N/A'} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        <ChangeCard title="1h Change" value={usdQuote.percent_change_1h} />
                        <ChangeCard title="24h Change" value={usdQuote.percent_change_24h} />
                        <ChangeCard title="7d Change" value={usdQuote.percent_change_7d} />
                        <ChangeCard title="30d Change" value={usdQuote.percent_change_30d} />
                    </div>

                    {description && (
                        <div className="mb-8 p-4 bg-gray-700/50 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-200 mb-2">About {name}</h2>
                            {/* Basic HTML rendering for description - consider a sanitizer if HTML is complex or untrusted */}
                            <div className="text-gray-300 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: description.replace(/\\n/g, '<br />') }}></div>
                        </div>
                    )}

                    <div className="text-xs text-gray-500 mt-8 text-right">
                        Last updated: {new Date(usdQuote.last_updated).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailCard = ({ title, value }) => (
    <div className="bg-gray-700/50 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-xl font-semibold text-gray-100">{value}</p>
    </div>
);

const ChangeCard = ({ title, value }) => {
    const isPositive = value >= 0;
    return (
        <div className={`bg-gray-700/50 p-4 rounded-lg shadow`}>
            <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
            <p className={`text-xl font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
            </p>
        </div>
    );
};

export default CryptoDetails;