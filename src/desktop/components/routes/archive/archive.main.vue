<!--
    Styles
-->

<style scoped>


    /* row */

    .row.active {
        z-index: 1;
    }
    .row:hover {
        background: #E5E5E5;
    }


    /* video */

    .video {
        position: fixed;
        width: 30rem;
        max-width: calc(50% - 1.5rem);
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
                :key="project.id"
                :video="project.video"
                :poster="project.frame"
                :active="project.id === active"
                :paused="false"
            />
        </div>


        <!-- rows -->

        <router-link
            class="u-grid row"
            v-for="project in sorted"
            v-show="canShow(project)"
            :key="project.id"
            :to="{name: 'archive-view', query: {id: project.id}}"
            @mousemove.native="move($event, project.id)">

            <div>{{project.client}}</div>
            <div>{{project.title}}</div>
            <div>{{project.category}}</div>
            <div>{{project.editor}}</div>

        </router-link>


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
                const margin = 1.5 * parseFloat(document.documentElement.style.fontSize);
                const $video = this.$refs.video;
                const video = $video.getBoundingClientRect();
                let y = event.clientY + margin;
                let x = event.clientX + margin;
                if (x + video.width > window.innerWidth) x = x - video.width - margin * 2;
                if (y + video.height > window.innerHeight) y = y - video.height - margin * 2;
                $video.style.left = x + 'px';
                $video.style.top = y + 'px';
                this.active = id;
            },

            canShow (project) {
                return !this.search ||
                    project.client.includes(this.search) ||
                    project.title.includes(this.search) ||
                    project.category.includes(this.search) ||
                    project.editor.includes(this.search);
            }

        }

    }

</script>
