import home from '@/desktop/components/routes/home/route.home.vue'
import index from '@/desktop/components/routes/index/route.index.vue'
import archive from '@/desktop/components/routes/archive/route.archive.vue'

export default [
    {
        name: 'home',
        path: '/',
        component: home
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
        name: 'private',
        path: '/private/:id',
        component: home
    },
    {
        name: 'private.index',
        path: '/private/:id/index',
        component: index
    },
    {
        path: '*',
        redirect: {
            name: 'home'
        }
    }
]