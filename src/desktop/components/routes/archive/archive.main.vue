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
    .row:last-child {
        border-bottom: none !important;
    }


    /* video */

    .ui-video {
        display: none;
        position: absolute;
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
    .row.active .ui-video {
        display: block;
    }


</style>



<!--
    Template
-->

<template>
    <div class="main">
        <div class="u-grid row" v-for="(project, i) in sorted" @mouseenter="enter(i)" @mouseleave="leave" @mousemove="move($event, i)" :class="{active: active === i}" v-show="canShow(project)">

            <div>{{project.client}}</div>
            <div>{{project.title}}</div>
            <div>{{project.category}}</div>
            <div>{{project.editor}}</div>

            <ui-video
                :video="project.video"
                :poster="project.frame"
                :paused="false"
                :active="active === i"
                ref="video"
            />
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

            ...mapState('App', ['archive']),
            ...mapState('Archive', ['search', 'sort']),

            sorted () {
                if (!this.sort) return this.archive;
                return this.archive.sort((a, b) => {
                    if (a[this.sort] < b[this.sort]) return -1;
                    if (a[this.sort] > b[this.sort]) return 1;
                    return 0;
                });
            }

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
                const $scroll = this.$el.parentNode;
                const $video = $row.querySelector('.ui-video');
                const row = $row.getBoundingClientRect();
                const video = $video.getBoundingClientRect();
                const scroll = $scroll.getBoundingClientRect();
                let x = event.clientX - row.left;
                let y = event.clientY - row.top;
                if (x + video.width > row.width) x -= video.width;
                if (event.clientY + video.height > scroll.top + scroll.height) y -= video.height;
                $video.style.left = x + 'px';
                $video.style.top = y + 'px';
            },

            canShow (project) {
                if (!this.search) return true;
                return !this.search ||
                    project.editor.toLowerCase().includes(this.search) ||
                    project.title.toLowerCase().includes(this.search) ||
                    project.category.toLowerCase().includes(this.search) ||
                    project.editor.toLowerCase().includes(this.search);
            }

        }



    }

</script>