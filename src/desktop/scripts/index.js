// ------------------
// Imports
// ------------------

import Vue from 'vue';
import Router from '@/common/scripts/modules/router'
import Store from '@/common/scripts/modules/store'

import app from '@/desktop/components/app.vue'
import view from '@/desktop/components/routes/view/route.view.vue'
import index from '@/desktop/components/routes/index/route.index.vue'
import archive from '@/desktop/components/routes/archive/route.archive.vue'

import '@/common/scripts/filters/index'
import '@/common/scripts/filters/text'
import '@/common/scripts/filters/time'
import '@/common/styles/base.css'
import '@/common/styles/utils.css'
import '@/desktop/styles/index.css'



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
        component: view,
        props: {
            view: 'home'
        }
    },
    {
        name: 'index',
        path: '/index',
        component: index
    },
    {
        name: 'archive',
        path: '/archive',
        component: archive
    },
    {
        name: 'archive-view',
        path: '/archive/view',
        component: view,
        props: {
            view: 'archive'
        }
    },
    {
        name: 'private',
        path: '/private/:id',
        component: view,
        props: {
            view: 'home'
        }
    },
    {
        name: 'private-index',
        path: '/private/:id/index',
        component: index
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
