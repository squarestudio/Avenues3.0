<!--
    Styles
-->

<style>


    /* default */

    .l-section {
        overflow: auto;
        transition: background .5s .5s;
    }
    .l-section:not(.loaded) {
        background: rgba(0,0,0,0) !important;
    }
    .l-section header {
        transform: translateY(-100%);
        transition: transform .5s;
    }
    .l-section header .logo {
        opacity: 0;
        transition: opacity .0s;
    }
    .l-section main {
        opacity: 0;
        transition: opacity .5s .5s;
    }
    .l-section footer {
        transform: translateY(100%);
        transition: transform .5s;
    }


    /* loaded */

    .l-section.loaded header {
        transform: translateY(0);
    }
    .l-section.loaded header .logo {
        opacity: 1;
        transition-delay: .5s;
    }
    .l-section.loaded main {
        opacity: 1;
    }
    .l-section.loaded footer {
        transform: translateY(0);
    }


</style>



<!--
    Template
-->

<template>
    <section class="l-section u-stretch u-col" :class="{loaded}">

        <header @transitionend="setState({showed: true})">
            <slot name="header" />
        </header>

        <main class="u-flex" :class="main">
            <slot name="main" />
        </main>

        <footer>
            <slot name="footer" />
        </footer>

    </section>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapMutations} from 'vuex'

    let time;

    export default {

        props: [
            'main'
        ],

        computed: {

            ...mapState('App', [
                'loaded'
            ])

        },

        methods: {

            ...mapMutations('App', [
                'setState'
            ])

        },

        watch: {

            loaded (value) {

                console.log('loaded', value);
                console.log('time', Date.now() - time);
            }

        },

        mounted () {
            time = Date.now();
            console.log('mounted');
        }

    }

</script>