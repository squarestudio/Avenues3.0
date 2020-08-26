<!--
    Styles
-->

<style>


    /* default */

    .l-section {
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
        transition: opacity .5s;
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

        <header>
            <slot name="header" />
        </header>

        <main class="u-flex">
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

    import {mapState} from 'vuex'

    export default {

        computed: {

            ...mapState('App', [
                'loaded'
            ])

        }

    }

</script>