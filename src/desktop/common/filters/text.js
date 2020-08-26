import Vue from 'vue'

Vue.filter('text', text => {
    return text && text.replace(/\n/g, '<br>');
})