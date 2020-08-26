import Vue from 'vue'

Vue.filter('text', function (value) {
    return value.replace(/\n/g, '<br>');
})