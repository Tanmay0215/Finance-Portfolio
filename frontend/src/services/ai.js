import api from '../utils/api';

export const getAIMarketOverview = async (cryptoData) => {
    const response = await api.post('/api/ai/market-overview', cryptoData);
    return response.data;
};
