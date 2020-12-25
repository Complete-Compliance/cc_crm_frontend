import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_ENVIRONMENT === 'LOCAL'
      ? 'http://localhost:3333/'
      : process.env.REACT_APP_API_ADDRESS,
});

export default api;
