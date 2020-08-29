<!--
    Styles
-->

<style scoped>

    .header {
        /*flex-shrink: 0;*/
    }


    /* project */

    .project {
        position: relative;
    }
    .project >>> .target {
        display: inline-flex;
    }
    .project >>> .source {
        position: absolute;
        top: 100%;
        left: 0;
        overflow: hidden;
        visibility: hidden;
        transition: visibility 0s .5s;
    }
    .project >>> .source .u-text {
        padding-top: 1rem;
        transform: translateY(-100%);
        transition: transform .5s;
    }
    .project.active >>> .source {
        visibility: visible;
        transition-delay: 0s;
    }
    .project.active >>> .source .u-text {
        transform: translateY(0);
    }


    /* buttons */

    .buttons {
        justify-content: space-between;
    }

    /*.project {*/
    /*    display: none;*/
    /*}*/
    
</style>



<!--
    Template
-->

<template>
    <div class="header u-grid">


        <!-- logo -->

        <div>
            <a class="logo link">Avenues</a>
        </div>


        <!-- index -->

        <div>
            <router-link :to="{name: private ? 'private-index' : 'index'}">Index</router-link>
        </div>


        <!-- project -->

        <div class="project"
             :class="{active: projectInfo}"
             :key="project.id"
             v-for="(project, i) in home"
             v-if="i === active">

            <ui-menu
                :active.sync="projectInfo"
                :target="project.client"
                :source="project.description | text"
            />

        </div>


        <!-- buttons -->

        <div class="buttons u-row">
            <ui-sound />
            <ui-view @click.native="viewToggle" :active="contain" />
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapGetters, mapMutations} from 'vuex'
    import uiView from '@/desktop/components/ui/view.vue'
    import uiSound from '@/desktop/components/ui/sound.vue'
    import uiMenu from '@/desktop/components/ui/menu.vue'

    export default {

        components: {
            uiView,
            uiSound,
            uiMenu
        },

        data () {
            return {
                projectInfo: false
            }
        },

        computed: {

            ...mapState('App', [
                'home',
            ]),

            ...mapState('Home', [
                'active',
                'contain'
            ]),

            ...mapGetters('App', [
                'private',
            ]),

        },

        methods: {

            ...mapMutations('Home', [
                'toggle'
            ]),

            viewToggle () {
                this.toggle('contain');
            }

        }

    }

</script>