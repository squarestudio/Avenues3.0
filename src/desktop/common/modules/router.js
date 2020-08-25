// ------------------
// Imports
// ------------------

import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/desktop/common/configs/routes'



// ------------------
// Setup
// ------------------

Vue.use(Router);



// ------------------
// Config
// ------------------

const router = new Router({
    routes,
    mode: 'history'
});



// ------------------
// Export
// ------------------

export default router;