export default {

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
            params: {
                limit: -1,
                fields: 'projects_id.*'
            }
        }
    },

    archive () {
        return {
            method: 'GET',
            url: '/items/public_archive',
            params: {
                limit: -1,
                fields: 'projects_id.*'
            }
        }
    },

    private (id) {
        return {
            method: 'GET',
            url: '/items/private_projects',
            params: {
                limit: -1,
                fields: 'projects_id.*',
                'filter[private_id][eq]': id
            }
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
            }
        }
    }

}