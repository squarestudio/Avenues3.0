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
    <section id="home" class="u-stretch u-col" @mousemove="move">

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
    import Timeout from '@/common/scripts/utils/timeout'
    import homeHeader from './home.header.vue'
    import homeControls from './home.controls.vue'
    import homePlayer from './home.player.vue'
    import homeFooter from './home.footer.vue'

    export default {

        components: {
            homeHeader,
            homeControls,
            homePlayer,
            homeFooter
        },

        data () {
            return {
                video: {},
                contain: false,
                paused: false,
                minimized: false,
                timeout: new Timeout(2000, this.minimize)
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
            },

            move () {
                if (!this.contain) return;
                this.minimized = false;
                this.timeout.stop();
                this.timeout.start();
            },

            minimize () {
                this.minimized = true;
            }

        },

        watch: {

            index () {
                this.paused = false;
            },

            contain (value) {
                if (value) this.timeout.start();
                else this.timeout.stop();
            }

        }


    }

</script>