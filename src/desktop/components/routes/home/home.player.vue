<!--
    Styles
-->

<style scoped>

    
    
</style>



<!--
    Template
-->

<template>
    <div class="u-stretch">
        <ui-video v-for="project in home" :video="project.video" :poster="project.frame" v-show="" />
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

        computed: {

            ...mapState('App', [
                'home'
            ])

        }

    }

</script>