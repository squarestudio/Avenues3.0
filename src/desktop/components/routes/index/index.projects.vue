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
                @mouseleave.native="leave(i)"
                @click.native="set({muted: false})">


                <!-- video -->

                <ui-video
                    class="hd"
                    :video="project.video"
                    :poster="project.cover"
                    :active="i === active"
                    :paused="false"
                    :time="project.starts_at"
                />


                <!-- ticker -->

                <ui-ticker :active="i === active">
                    <span>{{ project.title }}</span>
                    <span>{{ project.client }}</span>
                    <span>{{ project.editor }}</span>
                    <span>{{ project.description }}</span>
                </ui-ticker>


            </router-link>
        </div>
    </main>
</template>



<!--
    Scripts
-->

<script>

    import {mapMutations, mapState} from 'vuex'
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

            ...mapMutations([
                'set'
            ]),

            enter (index) {
                this.active = index;
            },

            leave () {
                this.active = -1;
            },

            canShow (project) {
                return !this.filter || project.editor.includes(this.filter);
            }

        }

    }

</script>
