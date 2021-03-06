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
            <router-view v-if="loaded" :class="`th-${theme}`" />
            <loader v-else :class="`th-${theme}`" />
        </transition>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapMutations} from 'vuex'
    import loader from './loader.vue'

    function history (route) {
        switch (route) {
            case 'home': return ['home'];
            case 'index': return ['home', 'index'];
            case 'archive': return ['home', 'archive'];
            case 'archive-view': return ['home', 'archive', 'archive-view'];
            case 'private': return ['private'];
            case 'private-index': return ['private', 'private-index'];
            default: return ['home'];
        }
    }

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
                switch (this.$route.name) {
                    case 'index': return 'white'
                    case 'archive': return 'white'
                    case 'private-index': return 'private'
                    default: return 'black'
                }
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

        methods: {

            ...mapMutations([
                'set',
                'navigate'
            ])

        },

        watch: {

            '$route.name' (to, from) {
                this.route = {to, from};
                this.navigate(this.route);
            }

        },

        created () {
            this.set({history: history(this.$route.name)});
        }

    }

</script>
