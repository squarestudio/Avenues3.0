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


    /* route fade transitions */

    #app .route-fade-enter-active {transition-duration: 1s;}

    #app .route-fade-enter        header .loader-sync {transform: translateY(calc(var(--padding) * -1 - 1rem));}
    #app .route-fade-enter-to     header .loader-sync {transform: translateY(0);}
    #app .route-fade-enter-active header .loader-sync {transition: transform .5s;}

    #app .route-fade-enter        nav {transform: translateY(100%);}
    #app .route-fade-enter-to     nav {transform: translateY(0);}
    #app .route-fade-enter-active nav {transition: transform .5s;}

    #app .route-fade-enter        main {opacity: 0;}
    #app .route-fade-enter-to     main {opacity: 1;}
    #app .route-fade-enter-active main {transition: opacity .5s .5s}


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

    import {mapMutations, mapState} from 'vuex'
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
                'private',
                'loaded'
            ]),

            contain () {
                return this.$route.query.contain;
            },

            theme () {
                if (this.private) return 'private';
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

        methods: {

            ...mapMutations([
                'set'
            ])

        },

        watch: {

            '$route.name' (to, from) {
                this.route = {to, from};
            },

            contain (value) {
                this.set({muted: !value})
            }
        },

        mounted () {
            document.body.classList.add(this.private ? 'th-private' : 'th-black');
        }

    }

</script>
