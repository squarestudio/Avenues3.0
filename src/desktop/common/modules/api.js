// ------------------
// Imports
// ------------------

import axios from 'axios';
import Config from '@/desktop/common/configs/api';



// ------------------
// Instance
// ------------------

const Axios = axios.create({
    baseURL: `${API_ORIGIN}/${API_PROJECT}`
});



// ------------------
// Interceptors
// ------------------

Axios.interceptors.response.use(response => {
    return response.data.data;
});



// ------------------
// Exports
// ------------------

export default function (...args) {
    const key = args.shift();
    const config = Config[key].apply(null, args);
    return Axios(config);
}