// ------------------
// Imports
// ------------------

import Vue from 'vue'
import Router from 'vue-router'



// ------------------
// Setup
// ------------------

Vue.use(Router);



// ------------------
// Export
// ------------------

export default routes => new Router({
    mode: 'history',
    routes: [
        ...routes,
        {
            path: '*',
            redirect: {
                name: 'home'
            }
        }
    ]
});