<!--
    Styles
-->

<style>

    #home {
        /*background: #00F; */
    }

</style>



<!--
    Template
-->

<template>
    <layout-section id="home">

        <template #header>
            <home-header />
        </template>

        <template #main>
<!--            <home-player />-->
<!--            <home-controls />-->
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

    import {mapState} from 'vuex'
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
                'loaded'
            ])

        },

        mounted () {
            // if (this.loaded) {}
            // else this.
        },

        watch: {

            'route.query.id' (id) {

            }

        }

    }

</script>