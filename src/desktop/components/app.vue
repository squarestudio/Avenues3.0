<!--
    Styles
-->

<style>


    /* main */

    #app      {overflow: hidden;}
    #home     {z-index: 1;}
    #index    {z-index: 2;}
    #archive  {z-index: 3;}
    #loader   {z-index: 4;}


    /* themes */

    .th-home {
        background: #000000;
        color: #f7f7f7;
    }
    .th-index, .th-archive {
        background: #f7f7f7;
        color: #000000;
    }
    .th-private-index {
        background: #B1B1B1;
        color: #000000;
    }


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

    section.route-fade-enter-active {transition-duration: 1s;}

    section.route-fade-enter        header > div:not(:first-child) {transform: translateY(calc(var(--padding) * -1 - 1rem));}
    section.route-fade-enter-to     header > div:not(:first-child) {transform: translateY(0);}
    section.route-fade-enter-active header > div:not(:first-child) {transition: transform .5s;}

    section.route-fade-enter        footer {transform: translateY(100%);}
    section.route-fade-enter-to     footer {transform: translateY(0);}
    section.route-fade-enter-active footer {transition: transform .5s;}

    section.route-fade-enter        nav, .route-fade-enter        main {opacity: 0;}
    section.route-fade-enter-to     nav, .route-fade-enter-to     main {opacity: 1;}
    section.route-fade-enter-active nav, .route-fade-enter-active main {transition: opacity .5s .5s}


</style>



<!--
    Template
-->

<template>
    <div id="app" class="u-stretch">

        <transition :name="transition">
            <router-view v-if="loaded" :class="theme" />
            <loader v-else :class="theme" />
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
                return 'th-' + this.$route.name;
            },

            transition () {
                if (!this.route.from) return 'route-fade'
                if (this.route.to === 'archive-view') return;
                if (this.route.from === 'archive-view') return;
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
