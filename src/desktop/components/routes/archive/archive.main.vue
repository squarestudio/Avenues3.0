<!--
    Styles
-->

<style scoped>


    /* row */

    .row {
        position: relative;
    }
    .row.active {
        z-index: 1;
    }


    /* video */

    .ui-video {
        position: absolute;
        top: .5rem;
        width: 30rem;
        pointer-events: none;
    }
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


</style>



<!--
    Template
-->

<template>
    <div class="main">
        <div class="u-grid row" v-for="(project, i) in archive" @mouseenter="enter(i)" @mouseleave="leave" @mousemove="move($event, i)" :class="{active: active === i}">
            <div>{{project.client}}</div>
            <div>{{project.title}}</div>
            <div>{{project.category}}</div>
            <div>{{project.editor}}</div>
            <ui-video :video="project.video" :poster="project.poster" v-if="active === i" ref="video"></ui-video>
        </div>
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
                active: -1
            }
        },

        computed: {

            ...mapState('App', [
                'archive'
            ])

        },

        methods: {

            enter (index) {
                this.active = index;
            },

            leave () {
                this.active = -1;
            },

            move (event, index) {
                const $row = event.currentTarget;
                const $video = $row.querySelector('.ui-video');
                const row = $row.getBoundingClientRect();
                const video = $video.getBoundingClientRect();
                let x = event.clientX;
                if (x + video.width > row.width) x -= video.width;
                $video.style.left = x + 'px';
            }

        }



    }

</script>