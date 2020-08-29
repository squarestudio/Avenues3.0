<!--
    Styles
-->

<style>

    #home {overflow: hidden;}
    #home .l-player   {z-index: 1;}
    #home .l-controls {z-index: 2;}
    #home .l-header   {z-index: 3;}
    #home .l-footer   {z-index: 4;}

</style>



<!--
    Template
-->

<template>
    <ui-section id="home" class="u-stretch u-col">
        <home-header class="l-header" />
        <home-player class="l-content l-player" />
        <home-controls class="l-content l-controls u-flex" />
        <home-footer class="l-footer" />
    </ui-section>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapGetters, mapMutations} from 'vuex'
    import uiSection from '@/desktop/components/ui/section.vue'
    import homeHeader from './home.header.vue'
    import homeControls from './home.controls.vue'
    import homePlayer from './home.player.vue'
    import homeFooter from './home.footer.vue'

    export default {

        components: {
            uiSection,
            homeHeader,
            homeControls,
            homePlayer,
            homeFooter
        },

        computed: {
            ...mapState('App', ['home', 'loaded']),
            ...mapGetters('Home', ['active'])
        },

        methods: {
            ...mapMutations('Home', ['set'])
        },

        watch: {

            loaded: {
                immediate: true,
                handler (value) {
                    value && this.set({paused: false});
                }
            },

            active () {
                this.set({paused: false});
            }

        },

        beforeRouteLeave (from, to, next) {
            this.set({paused: true});
            next();
        }


    }

</script>