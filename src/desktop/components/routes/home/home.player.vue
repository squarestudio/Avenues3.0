<!--
    Styles
-->

<style scoped>

    .l-player {
        overflow: hidden;
    }
    .l-player >>> .ui-video {
        position: absolute;
        top: 50%;
        left: 50%;
        transition: transform .3s;
    }
    .l-player:not(.contain) >>> .ui-video {
        transform: scale(1) !important;
    }

</style>



<!--
    Template
-->

<template>
    <div class="u-stretch l-player" :class="{contain}">
        <ui-video
            ref="video"
            v-for="(project, i) in home"
            v-show="project.id === active"
            :video="project.video"
            :poster="project.frame"
            :paused="paused"
            :active="project.id === active"
            :key="project.id"
            :style="styles[i]"
        />
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapGetters, mapMutations} from 'vuex'
    import uiVideo from '@/desktop/components/ui/video.vue'

    export default {

        components: {
            uiVideo
        },

        data () {

            return {
                styles: []
            }

        },

        computed: {

            ...mapState('App', ['home', 'loaded']),
            ...mapState('Home', ['contain', 'paused']),
            ...mapGetters('Home', ['active', 'index']),

        },

        methods: {

            ...mapMutations('Home', ['set']),

            setVideo () {
                const $video = this.$refs.video;
                if (!$video) return;
                this.set({video: $video[this.index].$refs.video});
            },

            resize () {
                this.styles = this.home.map(project => {
                    const maxW = this.$el.offsetWidth / project.videoWidth;
                    const maxH = this.$el.offsetHeight / project.videoHeight;
                    const maxS = Math.max(maxW, maxH);
                    const w = project.videoWidth * maxS;
                    const h = project.videoHeight * maxS;
                    const minW = this.$el.offsetWidth / w;
                    const minH = this.$el.offsetHeight / h;
                    const minS = Math.min(minW, minH);
                    return {
                        width: w + 'px',
                        height: h + 'px',
                        marginLeft: -w / 2 + 'px',
                        marginTop: -h / 2 + 'px',
                        transform: `scale(${minS})`
                    }
                })
            }

        },

        watch: {

            loaded () {
                this.resize();
                this.$nextTick(this.setVideo);
            },

            active () {
                this.setVideo();
            }

        },

        mounted () {
            window.addEventListener('resize', this.resize);
            this.resize();

        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>