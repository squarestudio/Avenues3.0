import Vue from 'vue';
import {sync} from 'vuex-router-sync'
import app from '@/desktop/components/app.vue'
import router from '@/desktop/common/modules/router'
import store from '@/desktop/common/modules/store'

import '@/common/styles/base.css'
import '@/common/styles/utils.css'
import '@/desktop/index.css'

import '@/desktop/common/filters/text'

sync(store, router);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
});