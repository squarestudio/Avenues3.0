import Vue from 'vue'

Vue.filter('time', (value = 0) => {
    return new Date(value * 1000).toISOString().substr(11, 8);
})