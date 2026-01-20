import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bookora.up.railway.app', // https://bookora.up.railway.app // localhost:8000
    withCredentials: true
})

export default api;