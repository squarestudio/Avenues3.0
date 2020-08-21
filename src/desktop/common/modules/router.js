// ------------------
// imports
// ------------------

import Vue from 'vue'
import Router from 'vue-router'
import home from '@/desktop/components/routes/home/route.home.vue'
import index from '@/desktop/components/routes/index/route.index.vue'



// ------------------
// Setup
// ------------------

Vue.use(Router);


// ------------------
// Config
// ------------------

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: home
    }, {
        path: '/index',
        component: index
    }]
});



// ------------------
// Export
// ------------------

export default router;