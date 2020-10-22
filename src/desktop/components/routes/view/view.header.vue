<!--
    Styles
-->

<style scoped>


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


    /* minimized */

    header {
        transition: opacity .3s;
    }
    header.minimized {
        opacity: 0;
    }


</style>



<!--
    Template
-->

<template>
    <header class="u-grid" :class="{minimized}">


        <!-- logo -->

        <div>
            <a class="logo u-link" @click="logo">Avenues</a>
        </div>


        <!-- index -->

        <div>
            <router-link class="u-link" v-if="!archive" :to="{name: private ? 'private-index' : 'index'}">Index</router-link>
        </div>


        <!-- project -->

        <div class="project"
             :class="{active: projectInfo}"
             v-for="project in projects"
             v-if="project.id === active"
             :key="project.id">

            <ui-menu
                :active.sync="projectInfo"
                :target="project.client"
                :source="project.description | text"
            />

        </div>


        <!-- buttons -->

        <div class="buttons u-row">
            <ui-sound />
            <router-link v-if="archive" :to="{name: 'archive'}">Close</router-link>
            <ui-view v-else @click.native="$emit('update:contain', !contain)" :active="contain" />
        </div>


    </header>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import uiView from '@/common/components/ui/view.vue'
    import uiSound from '@/desktop/components/ui/sound.vue'
    import uiMenu from '@/desktop/components/ui/menu.vue'

    export default {

        components: {
            uiView,
            uiSound,
            uiMenu
        },

        props: [
            'view',
            'projects',
            'contain',
            'active',
            'minimized'
        ],

        data () {
            return {
                projectInfo: false
            }
        },

        computed: {

            ...mapState([
                'private'
            ]),

            archive () {
                return this.view === 'archive'
            }

        },

        methods: {

            logo () {
                if (this.archive) return this.$router.push('/');
                if (this.contain) return this.$emit('update:contain', false);
                this.$router.push({query: {}});
            }

        }

    }

</script>
