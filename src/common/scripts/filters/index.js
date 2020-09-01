import Vue from 'vue'

Vue.filter('index', (index, total) => {
    const n = total.toString().length;
    const i = ('0'.repeat(n - 1) + index).slice(-n);
    return `${i} / ${total}`;
})