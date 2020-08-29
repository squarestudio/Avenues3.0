<!--
    Styles
-->

<style>


    #home header,
    #home .controls,
    #home footer {
        position: relative;
        z-index: 1;
    }

</style>



<!--
    Template
-->

<template>
    <layout-section id="home" main="u-col">

        <template #header>
            <home-header />
        </template>

        <template #main>
            <home-player />
            <home-controls />
        </template>

        <template #footer>
            <home-footer />
        </template>

    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapMutations} from 'vuex'
    import layoutSection from '@/desktop/components/layout/section.vue'
    import homeHeader from './home.header.vue'
    import homeControls from './home.controls.vue'
    import homePlayer from './home.player.vue'
    import homeFooter from './home.footer.vue'

    export default {

        components: {
            layoutSection,
            homeHeader,
            homeControls,
            homePlayer,
            homeFooter
        },

        computed: {

            ...mapState('App', [
                'home',
                'showed'
            ])

        },

        methods: {

            ...mapMutations('Home', [
                'toggle'
            ])

        },


        watch: {

            showed () {
                this.toggle('paused');
            }

        },

        mounted () {
            // if (this.loaded) {}
            // else this.
        },


    }

</script>