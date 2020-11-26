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
            :projects="projects"
            :contain="contain"
            :index="index"
            :paused="paused"
            :video.sync="video"
            @next="next"
        />

        <home-header
            :view="view"
            :projects="projects"
            :contain.sync="contain"
            :minimized="minimized"
            :active="active"
        />

        <home-controls
            class="u-flex"
            :projects="projects"
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

    import {mapGetters} from 'vuex'
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

        props: [
            'view'
        ],

        mixins: [
            minimize(1000)
        ],

        data () {
            return {
                video: {},
                contain: false,
                paused: false,
                projects: []
            }
        },

        beforeRouteLeave (to, from, next) {
            if (document.fullscreenElement) document.exitFullscreen();
            next();
        },

        computed: {

            ...mapGetters([
                'back'
            ]),

            active () {
                const id = +this.$route.query.id;
                if (!id || !this.projects.find(project => project.id === id)) return this.projects[0].id;
                return id;
            },

            index () {
                return this.projects.findIndex(project => project.id === this.active);
            }

        },

        methods: {

            next () {
                let next = this.index + 1;
                if (next > this.projects.length - 1) next = 0;
                this.$router.push({query: {id: this.projects[next].id}});
            },

            prev () {
                let prev = this.index - 1;
                if (prev < 0) prev = this.projects.length - 1;
                this.$router.push({query: {id: this.projects[prev].id}});
            },

            fullscreen () {
                this.contain = !!document.fullscreenElement;
            }

        },

        watch: {

            contain (value) {
                if (value) document.documentElement.requestFullscreen();
                else {
                    if (document.fullscreenElement) document.exitFullscreen();
                    if (this.view === 'archive') this.$router.push({ name: this.back });
                }
            },

            index () {
                this.paused = false;
            },

            view: {
                immediate: true,
                handler (value) {
                    this.contain = value === 'archive';
                    this.projects = this.$store.state[value];
                }
            }

        },

        mounted () {
            document.documentElement.addEventListener('fullscreenchange', this.fullscreen);
        },

        destroyed () {
            document.documentElement.removeEventListener('fullscreenchange', this.fullscreen);
        }


    }

</script>
