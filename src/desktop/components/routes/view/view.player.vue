<!--
    Styles
-->

<style scoped>

    main {
        overflow: hidden;
    }
    main.ready .ui-video {
        transition: transform .3s;
    }
    main:not(.contain) .ui-video {
        transform: scale(1) !important;
    }

</style>



<!--
    Template
-->

<template>
    <main class="u-stretch" :class="{contain, ready}">
        <div class="u-center">
            <ui-video
                ref="video"
                v-for="(project, i) in projects"
                v-show="i === index"
                :key="project.id"
                :video="project.video"
                :poster="project.frame"
                :paused="paused"
                :active="i === index"
                :style="styles[i]"
                @end="$emit('next')"
            />
        </div>
    </main>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import uiVideo from '@/common/components/ui/video.vue'

    export default {

        components: {
            uiVideo
        },

        props: [
            'projects',
            'index',
            'video',
            'contain',
            'paused'
        ],

        data () {

            return {
                ready: false,
                styles: []
            }

        },

        methods: {

            setVideo () {
                this.$emit('update:video', this.$refs.video[this.index].$refs.video);
            },

            resize () {
                this.styles = this.projects.map(project => {
                    const maxW = this.$el.offsetWidth / project.videoWidth;
                    const maxH = this.$el.offsetHeight / project.videoHeight;
                    const maxS = Math.max(maxW, maxH);
                    const w = project.videoWidth * maxS;
                    const h = project.videoHeight * maxS;
                    const minW = this.$el.offsetWidth / w;
                    const minH = this.$el.offsetHeight / h;
                    const minS = Math.min(minW, minH);
                    return {width: w + 'px', height: h + 'px', transform: `scale(${minS})`}
                })
            }

        },

        watch: {

            index () {
                this.setVideo();
            }

        },

        mounted () {
            window.addEventListener('resize', this.resize);
            this.resize();
            this.setVideo();
            setTimeout(() => this.ready = true);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>
