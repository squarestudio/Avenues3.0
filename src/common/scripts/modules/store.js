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

export default state => new Vuex.Store({

    state: {
        private: /^\/private/.test(location.pathname),
        loaded: false,
        muted: true,
        home: [],
        archive: [],
        about: {},
        ...state
    },

    mutations: {

        set (state, value) {
            Object.keys(value).forEach(key => state[key] = value[key]);
        }

    }

});