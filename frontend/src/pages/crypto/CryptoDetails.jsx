import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CryptoDetails = () => {
    const { id } = useParams();
    const [cryptoData, setCryptoData] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCryptoData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/api/crypto/${id.toUpperCase()}`);
            setCryptoData(response.data.data[id]);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            setError('Failed to fetch crypto data');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCryptoData();
    }, [id]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {cryptoData && (
                <>
                    <h1>Name: {cryptoData.name}</h1>
                    <p>Description: {cryptoData.description}</p>
                    <p>Price: {cryptoData.quote.USD.price}</p>
                    <p>Market Cap:{cryptoData.quote.USD.market_cap}</p>
                    <p>24H Volume: {cryptoData.quote.USD.volume_24h}</p>
                    <p>Circulating Supply:{cryptoData.circulating_supply}</p>
                    <p>Total Supply:{cryptoData.total_supply}</p>
                </>
            )}
        </div>
    );
};

export default CryptoDetails;