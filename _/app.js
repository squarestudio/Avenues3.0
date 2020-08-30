// ------------------
// Exports
// ------------------

export default {

    namespaced: true,

    state: {
        private: /^\/private/.test(location.pathname),
        loaded: false,
        muted: true,
        home: [],
        archive: [],
        about: {}
    }

}