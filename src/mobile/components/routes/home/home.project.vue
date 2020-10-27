<!--
    Styles
-->

<style scoped>

    .project {
        position: relative;
        overflow: hidden;
    }
    .project .ui-video {
        transition: transform .3s;
    }
    .project:not(.contain) .ui-video {
        transform: scale(1) !important;
    }

</style>



<!--
    Template
-->

<template>
    <div class="project" :class="{contain}">
        <div class="u-center">
            <ui-video
                ref="video"
                :video="project.video"
                :poster="project.frame"
                :active="active && started"
                :paused="false"
                :style="style"
                @ready="setVideo"
                @end="$emit('end')"
            />
        </div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import uiVideo from '@/common/components/ui/video.vue'

    export default {

        components: {
            uiVideo
        },

        props: [
            'project',
            'contain',
            'active'
        ],

        data () {
            return {
                style: {},
                started: false
            }
        },

        methods: {

            resize () {
                const maxW = this.$el.offsetWidth / this.project.videoWidth;
                const maxH = this.$el.offsetHeight / this.project.videoHeight;
                const maxS = Math.max(maxW, maxH);
                const w = this.project.videoWidth * maxS;
                const h = this.project.videoHeight * maxS;
                const minW = this.$el.offsetWidth / w;
                const minH = this.$el.offsetHeight / h;
                const minS = Math.min(minW, minH);
                this.style = {width: w + 'px', height: h + 'px', transform: `scale(${minS})`}
            },

            setVideo ($node) {
                this.$emit('video', $node);
            },

            start () {
                this.started = true;
            }

        },

        mounted () {
            this.resize();
            window.addEventListener('resize', this.resize);
            window.addEventListener('orientationchange', this.resize);
        },

        created () {
            document.addEventListener('routeTransitionEnd', this.start);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
            window.removeEventListener('orientationchange', this.resize);
            document.removeEventListener('routeTransitionEnd', this.start);
        }

    }

</script>
