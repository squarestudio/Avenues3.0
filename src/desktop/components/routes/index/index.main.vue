<!--
    Styles
-->

<style scoped>


    /* project */

    .project {
        overflow: hidden;
    }


    /* video */

    .ui-video:before {
        content: '';
        display: block;
        padding-top: 56.25%; /* 16:9 */
    }
    .ui-video >>> video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


    /* title */

    .title {
        margin-top: .75rem;
        overflow: hidden;
    }
    .title .move {
        display: inline-flex;
        white-space: nowrap;
    }
    .title p:nth-child(2) {
        display: none;
    }


    /* title animation */

    .title .move.play {
        animation: index-title linear infinite;
    }
    .title .move.play p {
        padding-right: 2.5rem;
    }
    .move.play p:nth-child(2) {
        display: block;
    }
    @keyframes index-title {
        100% {transform: translateX(-50%);}
    }


</style>



<!--
    Template
-->

<template>
    <div class="u-grid">
        <a class="project" v-for="(project, i) in home" @mouseenter="enter(i)" @mouseleave="leave(i)">


            <!-- video -->

            <ui-video
                :video="project.video"
                :poster="project.frame"
                :key="project.id"
                :active="i === active"
                :paused="false"
            />


            <!-- title -->

            <div class="title">
                <div class="move u-row" ref="move" :class="{play: active === i && moving}" :style="{animationDuration: active === i ? moving : ''}">
                    <p>{{ project.title}} / {{ project.client }} / {{ project.editor }}</p>
                    <p>{{ project.title}} / {{ project.client }} / {{ project.editor }}</p>
                </div>
            </div>


        </a>
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
                active: -1,
                moving: ''
            }
        },

        computed: {

            ...mapState('App', [
                'home'
            ])

        },

        methods: {

            enter (index) {
                const $move = this.$refs.move[index];
                this.moving = $move.offsetWidth > $move.parentNode.offsetWidth ? $move.offsetWidth / 75 + 's' : '';
                this.active = index;
            },

            leave () {
                this.active = -1;
            }

        }

    }

</script>