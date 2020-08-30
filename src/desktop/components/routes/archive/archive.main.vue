<!--
    Styles
-->

<style scoped>


    /* row */

    .row.active {
        z-index: 1;
    }


    /* video */

    .video {
        position: fixed;
        width: 30rem;
        pointer-events: none;
        background: #000;
    }


</style>



<!--
    Template
-->

<template>
    <main @mouseleave="leave">


        <!-- video -->

        <div class="video" v-show="active" ref="video">
            <ui-video
                class="hd"
                v-for="project in sorted"
                v-show="project.id === active"
                :video="project.video"
                :poster="project.frame"
                :active="project.id === active"
                :paused="false"
            />
        </div>


        <!-- rows -->

        <div class="u-grid row" v-for="project in sorted" v-show="canShow(project)" @mousemove="move($event, project.id)">
            <div>{{project.client}}</div>
            <div>{{project.title}}</div>
            <div>{{project.category}}</div>
            <div>{{project.editor}}</div>
        </div>


    </main>
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

        props: [
            'sort',
            'search'
        ],

        data () {
            return {
                active: false
            }
        },

        computed: {

            ...mapState([
                'archive'
            ]),

            sorted () {
                return this.archive.sort((a, b) => {
                    if (a[this.sort] < b[this.sort]) return -1;
                    if (a[this.sort] > b[this.sort]) return 1;
                    return 0;
                });
            }

        },

        methods: {

            leave () {
                this.active = false;
            },

            move (event, id) {
                const $video = this.$refs.video;
                const video = $video.getBoundingClientRect();
                let y = event.clientY;
                let x = event.clientX;
                if (y + video.height > window.innerHeight) y -= video.height;
                if (x + video.width > window.innerWidth) x -= video.width;
                $video.style.left = x + 'px';
                $video.style.top = y + 'px';
                this.active = id;
            },

            canShow (project) {
                return !this.search ||
                    project.editor.includes(this.search) ||
                    project.title.includes(this.search) ||
                    project.category.includes(this.search) ||
                    project.editor.includes(this.search);
            }

        }

    }

</script>