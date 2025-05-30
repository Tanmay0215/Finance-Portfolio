import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://finance-portfolio-pb6f.onrender.com/',
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api