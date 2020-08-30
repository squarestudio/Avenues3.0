export default {

    namespaced: true,

    state: {
        video: {},
        contain: false,
        paused: true,
        minimized: false,
        about: false
    },

    getters: {

        active (state, getters, rootState) {
            const home = rootState.App.home;
            if (!home.length) return;
            const id = +rootState.route.query.id;
            if (!id || !home.find(project => project.id === id)) return home[0].id;
            return id;
        },

        index (state, getters, rootState) {
            return rootState.App.home.findIndex(project => project.id === getters.active);
        }

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