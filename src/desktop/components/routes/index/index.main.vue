<!--
    Styles
-->

<style scoped>


    /* main */

    .u-grid {
        padding-top: 0;
    }
    .project {
        overflow: hidden;
    }


    /* ticker */

    .ui-ticker {
        margin-top: .75rem;
    }
    .ui-ticker span:after {
        content: '/';
        margin: 0 .3rem;
    }
    .ui-ticker span:last-child:after {
        visibility: hidden;
    }
    .ui-ticker.active span:last-child:after {
        visibility: visible;
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
    <main>
        <div class="u-grid">
            <router-link
                class="project"
                v-for="(project, i) in home"
                v-show="canShow(project)"
                :key="project.id"
                :to="{name: private ? 'private' : 'home', query: {id: project.id}}"
                @mouseenter.native="enter(i)"
                @mouseleave.native="leave(i)">


                <!-- video -->

                <ui-video
                    class="hd"
                    :video="project.video"
                    :poster="project.frame"
                    :active="i === active"
                    :paused="false"
                />


                <!-- ticker -->

                <ui-ticker :active="i === active">
                    <span>{{ project.title }}</span>
                    <span>{{ project.client }}</span>
                    <span>{{ project.editor }}</span>
                </ui-ticker>


            </router-link>
        </div>
    </main>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import uiVideo from '@/common/components/ui/video.vue'
    import uiTicker from '@/common/components/ui/ticker.vue'

    export default {

        components: {
            uiVideo,
            uiTicker
        },

        props: [
            'filter'
        ],

        data () {
            return {
                active: -1
            }
        },

        computed: {

            ...mapState([
                'home',
                'private'
            ]),

        },

        methods: {

            enter (index) {
                this.active = index;
            },

            leave () {
                this.active = -1;
            },

            canShow (project) {
                return !this.filter || project.editor === this.filter
            }

        }

    }

</script>