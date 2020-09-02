import Vue from 'vue'

Vue.filter('index', (index, total) => {
    const n = total.toString().length;
    const i = ('0'.repeat(n - 1) + (index + 1)).slice(-n);
    return `${i} / ${total}`;
})