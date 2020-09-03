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


                <!-- title -->

                <div class="title">
                    <div class="move u-row" ref="move">
                        <p>{{ project.title}} / {{ project.client }} / {{ project.editor }}</p>
                        <p>{{ project.title}} / {{ project.client }} / {{ project.editor }}</p>
                    </div>
                </div>


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

    export default {

        components: {
            uiVideo
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
                const $move = this.$refs.move[index];
                if ($move.offsetWidth < $move.parentNode.offsetWidth) return;
                $move.classList.add('play');
                $move.style.animationDuration = $move.offsetWidth / 75 + 's';
            },

            leave (index) {
                this.active = -1;
                const $move = this.$refs.move[index];
                $move.classList.remove('play');
                $move.style.animationDuration = '';
            },

            canShow (project) {
                return !this.filter || project.editor === this.filter
            }

        }

    }

</script>