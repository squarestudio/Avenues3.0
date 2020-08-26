export default {

    namespaced: true,

    state: {
        active: 0,
        contain: false,
        paused: false,
        minimized: false,
        about: false
    },

    mutations: {

        toggle (state, key) {
            state[key] = !state[key];
        }

    }

}