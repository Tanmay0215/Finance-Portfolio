import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CryptoDetails = () => {
    const { id } = useParams();
    const [cryptoData, setCryptoData] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/crypto/${id.toUpperCase()}`);
            setCryptoData(response.data.data[id]);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
        }
    };

    useEffect(() => {
        fetchCryptoData();
    }, [id]);

    return (
        <div>
            {
                cryptoData && (
                    <>
                        <h1>{cryptoData.name}</h1>
                        <p>{cryptoData.description}</p>
                        <p>{cryptoData.quote.USD.price}</p>
                        <p>{cryptoData.quote.USD.market_cap}</p>
                        <p>{cryptoData.quote.USD.volume_24h}</p>
                        <p>{cryptoData.circulating_supply}</p>
                        <p>{cryptoData.total_supply}</p>
                    </>
                )
            }
        </div>
    );
};

export default CryptoDetails;