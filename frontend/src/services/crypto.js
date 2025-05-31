import api from '../utils/api';

export const getAllCrypto = async () => {
    const response = await api.get('/api/crypto/get-all');
    return response.data;
};

export const getCryptoById = async (id) => {
    const response = await api.get(`/api/crypto/get/${id}`);
    return response.data.data;
};
