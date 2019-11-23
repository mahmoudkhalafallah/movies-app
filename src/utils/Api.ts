import { API_URL, API_KEY } from "./Constants";
import axios from 'axios';
const data = require('../../assets/data/data.json')

axios.interceptors.request.use((config) => {
    config.params['api_key'] = API_KEY;
    return config;
}, (error) => {
    return Promise.reject(error);
})

const get = (endpoint: string, params = {}) => {
    return axios.get(`${API_URL}/${endpoint}/`, { params })
}


const post = async (endpoint: string) => {
    return
}

const put = async (endpoint: string) => {
    return
}

const del = async (endpoint: string) => {
    return
}

export default {
    get,
    post,
    put,
    delete: del
}