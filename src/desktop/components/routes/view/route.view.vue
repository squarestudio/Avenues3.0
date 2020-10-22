<!--
    Styles
-->

<style>

    #home {overflow: hidden;}
    #home main   {z-index: 1;}
    #home nav    {z-index: 2;}
    #home header {z-index: 3;}
    #home footer {z-index: 4;}

</style>



<!--
    Template
-->

<template>
    <section id="home" class="u-stretch u-col" @mousemove="minimizeReset">

        <home-player
            :contain="contain"
            :index="index"
            :paused="paused"
            :video.sync="video"
            @next="next"
        />

        <home-header
            :contain.sync="contain"
            :minimized="minimized"
            :active="active"
        />

        <home-controls
            class="u-flex"
            :index="index"
            :video="video"
            :minimized="minimized"
            :paused.sync="paused"
            @next="next"
            @prev="prev"
        />

        <home-footer
            :contain="contain"
            :video="video"
            :minimized="minimized"
        />

    </section>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import minimize from '@/common/scripts/mixins/minimize'
    import homeHeader from './view.header.vue'
    import homeControls from './view.controls.vue'
    import homePlayer from './view.player.vue'
    import homeFooter from './view.footer.vue'

    export default {

        components: {
            homeHeader,
            homeControls,
            homePlayer,
            homeFooter
        },

        mixins: [
            minimize(2000)
        ],

        data () {
            return {
                video: {},
                contain: false,
                paused: false
            }
        },

        computed: {

            ...mapState([
                'home'
            ]),

            active () {
                const id = +this.$route.query.id;
                if (!id || !this.home.find(project => project.id === id)) return this.home[0].id;
                return id;
            },

            index () {
                return this.home.findIndex(project => project.id === this.active);
            }

        },

        methods: {

            next () {
                let next = this.index + 1;
                if (next > this.home.length - 1) next = 0;
                this.$router.push({query: {id: this.home[next].id}});
            },

            prev () {
                let prev = this.index - 1;
                if (prev < 0) prev = this.home.length - 1;
                this.$router.push({query: {id: this.home[prev].id}});
            }

        },

        watch: {

            index () {
                this.paused = false;
            }

        }


    }

</script>
