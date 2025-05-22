import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CMC_API_KEY = process.env.CMC_API_KEY
const CMC_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';

export const getCryptoData = async (req, res) => {
    try {
        const response = await axios.get(`${CMC_API_URL}/listings/latest`, {
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
            },
            params: {
                start: '1',
                limit: '100', // Adjust as needed
                convert: 'USD', // Adjust as needed
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching crypto data:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to fetch cryptocurrency data', error: error.response ? error.response.data : error.message });
    }
};

export const getCryptoDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${CMC_API_URL}/quotes/latest`, {
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
            },
            params: {
                symbol: id.toUpperCase(),
                convert: 'USD', // Adjust as needed
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching crypto data by ID:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to fetch cryptocurrency data by ID', error: error.response ? error.response.data : error.message });
    }
}