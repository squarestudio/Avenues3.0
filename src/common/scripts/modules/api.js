// ------------------
// Imports
// ------------------

import axios from 'axios'



// -------------------------
// Default projects params
// -------------------------

const params = {
    limit: -1,
    fields: 'projects_id.*',
    'filter[projects_id.id][nempty]': true
}



// ------------------
// Config
// ------------------

const Config = {

    about () {
        return {
            method: 'GET',
            url: '/items/about/1'
        }
    },

    home () {
        return {
            method: 'GET',
            url: '/items/public_projects',
            params
        }
    },

    archive () {
        return {
            method: 'GET',
            url: '/items/public_archive',
            params
        }
    },

    private (id) {
        return {
            method: 'GET',
            url: '/items/private_projects',
            params: {...params, 'filter[private_id][eq]': id}
        }
    },

    privateInfo (id) {
        return {
            method: 'GET',
            url: '/items/private/' + id,
            params: {fields: 'title'}
        }
    },

    login (password, id) {
        return {
            method: 'GET',
            url: '/items/private',
            params: {
                fields: 'id',
                'filter[password][eq]': password,
                'filter[id][eq]': id
            },
            transformResponse: axios.defaults.transformResponse.concat(response => {
                response.data = !!response.data.length;
                return response;
            })
        }
    }

}



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