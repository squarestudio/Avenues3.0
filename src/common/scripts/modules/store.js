// ------------------
// imports
// ------------------

import Vue from 'vue'
import Vuex from 'vuex'



// ------------------
// Setup
// ------------------

Vue.use(Vuex);



// ------------------
// Exports
// ------------------

export default () => new Vuex.Store({

    state: {
        private: /^\/private/.test(location.pathname),
        privateInfo: {},
        loaded: false,
        muted: true,
        home: [],
        archive: [],
        about: {},
        history: []
    },

    mutations: {

        set (state, value) {
            Object.keys(value).forEach(key => state[key] = value[key]);
        },

        navigate ({history}, {from, to}) {
            const _from = history[history.length - 1];
            const _to = history[history.length - 2];
            if (_from === from && _to === to) history.pop();
            else history.push(to);
        }

    },

    getters: {

        back (state) {
            return state.history[state.history.length - 2];
        }

    }

});
