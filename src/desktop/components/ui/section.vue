<!--
    Styles
-->

<style>


    /* default */

    .ui-section .l-header {
        transform: translateY(-100%);
        transition: transform .5s;
    }
    .ui-section .l-header .logo {
        opacity: 0;
        transition: opacity .0s;
    }
    .ui-section .l-content {
        opacity: 0;
        transition: opacity .5s .5s;
    }
    .ui-section .l-footer {
        transform: translateY(100%);
        transition: transform .5s;
    }


    /* loaded */

    .ui-section.loaded .l-header {
        transform: translateY(0);
    }
    .ui-section.loaded .l-header .logo {
        opacity: 1;
        transition-delay: .5s;
    }
    .ui-section.loaded .l-content {
        opacity: 1;
    }
    .ui-section.loaded .l-footer {
        transform: translateY(0);
    }


</style>



<!--
    Template
-->

<template>
    <section class="ui-section" :class="{loaded}">
        <slot />
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