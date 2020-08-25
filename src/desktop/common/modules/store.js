// ------------------
// imports
// ------------------

import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/desktop/common/stores/app'



// ------------------
// Setup
// ------------------

Vue.use(Vuex);



// ------------------
// Home
// ------------------

const Home = {
    namespaced: true,
    state: {
        video: -1,
        contain: false,
        loaded: false,
        paused: false,
        minimized: false,
        about: false
    }
}



// ------------------
// Index
// ------------------

const Index = {
    namespaced: true,
    state: {
        filter: ''
    }
}



// ------------------
// Archive
// ------------------

const Archive = {
    namespaced: true,
    state: {
        search: '',
        sort: '',
    }
}



// ------------------
// Exports
// ------------------

export default new Vuex.Store({

    modules: {
        App,
        Home,
        Index,
        Archive
    }

});