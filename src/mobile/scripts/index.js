// ------------------
// Imports
// ------------------

import Vue from 'vue';
import Router from '@/common/scripts/modules/router'
import Store from '@/common/scripts/modules/store'

import app from '@/mobile/components/app.vue'
import home from '@/mobile/components/routes/home/route.home.vue'
import archive from '@/mobile/components/routes/archive/route.archive.vue'

import '@/common/scripts/filters/index'
import '@/common/scripts/filters/text'
import '@/common/scripts/filters/time'
import '@/common/styles/base.css'
import '@/common/styles/utils.css'
import '@/mobile/styles/index.css'



// ------------------
// Disable Vue logs
// ------------------

Vue.config.productionTip = false;
Vue.config.devtools = false;



// ------------------
// Routes
// ------------------

const routes = [
    {
        name: 'home',
        path: '/',
        component: home
    },
    {
        name: 'archive',
        path: '/archive',
        component: archive
    },
    {
        name: 'private',
        path: '/private/:id',
        component: home
    }
];



// ------------------
// Initialization
// ------------------

new Vue({
    el: '#app',
    store: Store(),
    router: Router(routes),
    render: h => h(app)
});