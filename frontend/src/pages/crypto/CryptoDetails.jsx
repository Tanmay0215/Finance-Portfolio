import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getCryptoById } from '../../services/crypto';
import { getAIMarketOverview } from '../../services/ai';
import { DollarSign, BarChartHorizontalBig, Coins, Database, Box, Info, TrendingUp, TrendingDown } from 'lucide-react';
import Loader from '../../components/common/Loader';

const Section = ({ title, children, icon }) => (
    <section className="mb-8">
        <div className="flex items-center mb-4">
            {icon && React.cloneElement(icon, { size: 24, className: "mr-3 text-blue-400" })}
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        {children}
    </section>
);

const CryptoDetails = () => {
    const { id } = useParams();
    const [cryptoData, setCryptoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [aiOverview, setAIOverview] = useState(null);
    const [aiLoading, setAILoading] = useState(false);

    const fetchCryptoData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getCryptoById(id);
            setCryptoData(data);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            setError('Failed to fetch crypto data. Please try again later.');
        }
        setLoading(false);
    }, [id]);

    const aiMarketOverview = useCallback(async () => {
        setAILoading(true);
        try {
            const overviewData = await getAIMarketOverview(cryptoData);
            setAIOverview(overviewData);
            console.log('AI Market Overview:', overviewData);
        } catch (error) {
            console.error('Error fetching AI market overview:', error);
            setError('Failed to fetch AI market overview. Please try again later.');
        }
        setAILoading(false);
    }, [cryptoData]);

    useEffect(() => {
        fetchCryptoData();
    }, [fetchCryptoData]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-4">
                <Loader />
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

    const coinKey = id.toUpperCase();
    const coinDetails = cryptoData[coinKey];

    const {
        name,
        symbol,
        circulating_supply,
        total_supply,
        max_supply,
        cmc_rank,
        id: coinMarketCapId
    } = coinDetails;

    if (!coinDetails.quote || !coinDetails.quote.USD) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-4">
                <p className="text-xl">Pricing data (USD quote) is not available for {name || coinKey}.</p>
            </div>
        );
    }
    const usdQuote = coinDetails.quote.USD;

    const formatNumber = (num) => {
        if (num === null || num === undefined) return 'N/A';
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="bg-gray-800 shadow-2xl rounded-xl p-6 md:p-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-gray-700">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img
                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinMarketCapId}.png`}
                                alt={name}
                                className="w-12 h-12 mr-4 rounded-full"
                                onError={(e) => { e.target.style.display = 'none'; }} // Hide if image fails to load
                            />
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white">{name} ({symbol})</h1>
                                {cmc_rank && <p className="text-sm text-gray-400">Rank #{cmc_rank}</p>}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`text-3xl sm:text-4xl font-semibold ${usdQuote.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${formatNumber(usdQuote.price)}
                            </div>
                            <div className={`text-sm font-medium ${usdQuote.percent_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {usdQuote.percent_change_24h >= 0 ? <TrendingUp size={16} className="inline mr-1" /> : <TrendingDown size={16} className="inline mr-1" />}
                                {usdQuote.percent_change_24h.toFixed(2)}% (24h)
                            </div>
                        </div>
                    </div>

                    {/* Financial Overview Section */}
                    <Section title="Financial Overview" icon={<DollarSign />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailCard title="Market Cap" value={`$${formatNumber(usdQuote.market_cap)}`} icon={<DollarSign />} />
                            <DetailCard title="24h Volume" value={`$${formatNumber(usdQuote.volume_24h)}`} icon={<BarChartHorizontalBig />} />
                            <DetailCard title="Fully Diluted Market Cap" value={`$${formatNumber(usdQuote.fully_diluted_market_cap)}`} icon={<DollarSign />} />
                            <DetailCard title="Circulating Supply" value={`${formatNumber(circulating_supply)} ${symbol}`} icon={<Coins />} />
                            <DetailCard title="Total Supply" value={`${formatNumber(total_supply)} ${symbol}`} icon={<Database />} />
                            <DetailCard title="Max Supply" value={max_supply ? `${formatNumber(max_supply)} ${symbol}` : 'N/A'} icon={<Box />} />
                        </div>
                    </Section>

                    {/* Price Performance Section */}
                    <Section title="Price Performance" icon={<TrendingUp />}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ChangeCard title="1h Change" value={usdQuote.percent_change_1h} />
                            <ChangeCard title="24h Change" value={usdQuote.percent_change_24h} />
                            <ChangeCard title="7d Change" value={usdQuote.percent_change_7d} />
                            <ChangeCard title="30d Change" value={usdQuote.percent_change_30d} />
                        </div>
                    </Section>

                    {/* AI Market Overview Section */}
                    <Section title="AI Market Overview" icon={<Info />}>
                        {!aiOverview && (
                            <button
                                onClick={aiMarketOverview}
                                disabled={loading || !cryptoData} // Keep disabled logic for when button is shown
                                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500"
                            >
                                {aiLoading ? 'Loading Overview...' : 'Get AI Market Overview'} {/* Simplified button text for loading state */}
                            </button>
                        )}
                        {aiOverview && (
                            <div className="p-4 bg-gray-700/60 rounded-lg shadow">
                                <p className="text-gray-300">{aiOverview.overview}</p>
                            </div>
                        )}
                    </Section>

                    {/* Last Updated Info */}
                    <div className="text-xs text-gray-500 mt-10 pt-4 border-t border-gray-700 text-right">
                        Last updated: {new Date(usdQuote.last_updated).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailCard = ({ title, value, icon }) => (
    <div className="bg-gray-700/60 p-4 rounded-lg shadow flex items-start space-x-3 hover:bg-gray-700 transition-colors duration-150">
        {icon && React.cloneElement(icon, { size: 22, className: "text-blue-400 mt-1" })}
        <div>
            <h3 className="text-sm font-medium text-gray-400 mb-0.5">{title}</h3>
            <p className="text-lg font-semibold text-gray-100">{value}</p>
        </div>
    </div>
);

const ChangeCard = ({ title, value }) => {
    const isPositive = value >= 0;
    return (
        <div className="bg-gray-700/60 p-4 rounded-lg shadow hover:bg-gray-700 transition-colors duration-150">
            <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
            <div className={`flex items-center text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? <TrendingUp size={20} className="mr-1" /> : <TrendingDown size={20} className="mr-1" />}
                <span>{Math.abs(value).toFixed(2)}%</span>
            </div>
        </div>
    );
};

export default CryptoDetails;