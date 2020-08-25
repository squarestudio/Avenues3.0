// ------------------
// imports
// ------------------

import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/desktop/common/stores/app'
import Home from '@/desktop/common/stores/home'



// ------------------
// Setup
// ------------------

Vue.use(Vuex);



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