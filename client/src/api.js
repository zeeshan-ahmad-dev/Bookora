import axios from 'axios';

const api = axios.create({
    baseURL: 'http://bookora.up.railway.app', // bookora.up.railway.app // localhost:8000
    withCredentials: true
})

export default api;