<!--
    Styles
-->

<style>


    /* main */

    #app      {overflow: hidden;}
    #home     {z-index: 1;}
    #index    {z-index: 2;}
    #archive  {z-index: 3;}


    /* route transitions */

    #app section {transition: none;}

    #app .route-up-enter-active,
    #app .route-up-leave-active,
    #app .route-down-enter-active,
    #app .route-down-leave-active {
        transition: transform .5s;
    }

    #app .route-up-enter      {transform: translateY(100%)}
    #app .route-up-enter-to   {transform: translateY(0)}
    #app .route-up-leave      {transform: translateY(0)}
    #app .route-up-leave-to   {transform: translateY(-50%)}
    #app .route-down-enter    {transform: translateY(-50%)}
    #app .route-down-enter-to {transform: translateY(0)}
    #app .route-down-leave    {transform: translateY(0)}
    #app .route-down-leave-to {transform: translateY(100%)}


</style>



<!--
    Template
-->

<template>
    <div id="app" class="u-stretch">

        <layout-loader />

        <transition :name="transition">
            <router-view />
        </transition>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import layoutLoader from '@/desktop/components/layout/loader.vue'

    export default {

        components: {
            layoutLoader
        },

        data () {
            return {
                route: {
                    to: null,
                    from: null
                }
            }
        },

        computed: {

            ...mapState('App', [
                'loaded'
            ]),

            transition () {
                if (this.route.to === 'archive') return 'route-up';
                if (this.route.from === 'archive') return 'route-down';
                return null;
            }

        },

        watch: {
            '$route.name' (to, from) {
                this.route = {to, from};
            }
        }

    }

</script>