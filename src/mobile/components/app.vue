<!--
    Styles
-->

<style>

    /* main */

    #app      {overflow: hidden;}
    #home     {z-index: 1;}
    #archive  {z-index: 2;}
    #loader   {z-index: 3;}


    /* route move transitions */

    .route-up-enter-active,
    .route-up-leave-active,
    .route-down-enter-active,
    .route-down-leave-active {
        transition: transform .5s;
    }

    .route-up-enter      {transform: translateY(100%)}
    .route-up-enter-to   {transform: translateY(0)}
    .route-up-leave      {transform: translateY(0)}
    .route-up-leave-to   {transform: translateY(-50%)}
    .route-down-enter    {transform: translateY(-50%)}
    .route-down-enter-to {transform: translateY(0)}
    .route-down-leave    {transform: translateY(0)}
    .route-down-leave-to {transform: translateY(100%)}


    /* route fade transitions */

    .route-fade-enter-active {transition-duration: 1s;}

    section.route-fade-enter        header . {transform: translateY(-100%);}
    section.route-fade-enter-to     header {transform: translateY(0);}
    section.route-fade-enter-active header {transition: transform .5s;}

    section.route-fade-enter        nav {transform: translateY(100%);}
    section.route-fade-enter-to     nav {transform: translateY(0);}
    section.route-fade-enter-active nav {transition: transform .5s;}

    /*section.route-fade-enter        nav, .route-fade-enter        main {opacity: 0;}*/
    /*section.route-fade-enter-to     nav, .route-fade-enter-to     main {opacity: 1;}*/
    /*section.route-fade-enter-active nav, .route-fade-enter-active main {transition: opacity .5s .5s}*/
    
</style>



<!--
    Template
-->

<template>
    <div id="app" class="u-stretch">

        <transition :name="transition">
            <router-view v-if="loaded" />
            <loader v-else :class="`th-${theme}`" />
        </transition>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import loader from './loader.vue'

    export default {

        components: {
            loader
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

            ...mapState([
                'loaded'
            ]),

            theme () {
                if (this.$route.query.contain) return 'black';
                if (this.$route.name === 'archive') return 'white';
                return 'black';
            },

            transition () {
                if (!this.route.from) return 'route-fade'
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