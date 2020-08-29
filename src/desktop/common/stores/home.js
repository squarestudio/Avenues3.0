export default {

    namespaced: true,

    state: {
        active: 0,
        contain: false,
        paused: true,
        minimized: false,
        about: false
    },

    mutations: {

        toggle (state, key) {
            state[key] = !state[key];
        },

        set (state, value) {
            Object.keys(value).forEach(key => state[key] = value[key]);
        }

    }

}