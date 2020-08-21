import Vue from 'vue';
import app from '@/desktop/components/app.vue'
import router from '@/desktop/common/modules/router'

new Vue({
    el: '#app',
    router,
    render: h => h(app)
});