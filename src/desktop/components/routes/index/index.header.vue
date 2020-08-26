<!--
    Styles
-->

<style scoped>

    .link {

    }


    /* project */

    .project {
        position: relative;
    }
    .project .target {
        display: inline-flex;
    }
    .project .source {
        position: absolute;
        top: 100%;
        left: 0;
        overflow: hidden;
        visibility: hidden;
        transition: visibility 0s, .5s;
    }
    .project .source .move {
        padding-top: 1rem;
        transform: translateY(-100%);
        transition: transform .5s;
    }
    .project.active .source {
        visibility: visible;
        transition-duration: 0s;
    }
    .project.active .source .move {
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
    <div class="u-grid">


        <!-- logo -->

        <div>
            <a class="logo link">Avenues</a>
        </div>


        <!-- index -->

        <div>
            <a class="u-link" data-route-to="index">Index</a>
        </div>


        <!-- project -->

        <div class="project"
             :class="{active: projectInfo}"
             v-for="(project, i) in home"
             v-if="i === active">

            <a class="target u-row"
               @mouseenter="targetEnter"
               @mouseleave="targetLeave">
                {{project.client}}
            </a>

            <div class="source" @mouseleave="sourceLeave">
                <div class="move">
                    <div class="u-text">{{project.description}}</div>
                </div>
            </div>

        </div>


        <!-- buttons -->

        <div class="buttons u-row">
            <ui-sound />
            <ui-view />
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import {hasParent} from '@/common/scripts/utils'
    import uiView from '@/desktop/components/ui/view.vue'
    import uiSound from '@/desktop/components/ui/sound.vue'

    export default {

        components: {
            uiView,
            uiSound
        },

        data () {
            return {
                projectInfo: false
            }
        },

        methods: {

            targetEnter () {
                this.projectInfo = true;
            },

            targetLeave (event) {
                if (!hasParent(event.relatedTarget, event.currentTarget.nextElementSibling)) this.projectInfo = false;
            },

            sourceLeave (event) {
                if (!hasParent(event.relatedTarget, event.currentTarget.previousElementSibling)) this.projectInfo = false;
            }

        },

        computed: {

            ...mapState('App', ['home']),
            ...mapState('Home', ['active'])

        }

    }

</script>