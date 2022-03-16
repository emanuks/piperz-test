import axios from 'axios';

const api = axios.create({
    baseURL: 'https://interview.piperz.com.br/api'
});

export default api;