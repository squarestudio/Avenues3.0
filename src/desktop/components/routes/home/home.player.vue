<!--
    Styles
-->

<style scoped>

    .player {
        overflow: hidden;
    }
    .player >>> .ui-video {
        position: absolute;
        top: 50%;
        left: 50%;
        transition: transform .3s;
    }
    .player:not(.contain) >>> .ui-video {
        transform: scale(1) !important;
    }

</style>



<!--
    Template
-->

<template>
    <div class="u-stretch player" :class="{contain}">
        <ui-video
            v-for="(project, i) in home"
            v-if="active === i"
            :video="project.video"
            :poster="project.frame"
            :key="project.id"
            :style="styles[i]"
        />
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
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

            ...mapState('App', [
                'home',
                'loaded'
            ]),

            ...mapState('Home', [
                'active',
                'contain'
            ])

        },

        methods: {

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

            loaded: {
                immediate: true,
                handler (value) {
                    value && this.resize();
                }
            }

        },

        mounted () {
            window.addEventListener('resize', this.resize);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>