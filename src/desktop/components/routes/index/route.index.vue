<!--
    Styles
-->

<style>

    #index {
        overflow: auto;
    }
    #index header {
        z-index: 1;
    }

</style>



<!--
    Template
-->

<template>
    <section id="index" class="u-stretch u-col">
        <index-header :filter.sync="filter" :editors.sync="editors" @back="back" />
        <index-projects :filter="filter" class="u-flex" />
        <index-footer />
        <index-editors :filter.sync="filter" :editors.sync="editors" />
    </section>
</template>



<!--
    Scripts
-->

<script>

    import mixinBack from '@/common/scripts/mixins/back'
    import indexHeader from './index.header.vue'
    import indexProjects from './index.projects.vue'
    import indexFooter from './index.footer.vue'
    import indexEditors from './index.editors.vue'

    export default {

        components: {
            indexHeader,
            indexProjects,
            indexEditors,
            indexFooter
        },

        mixins: [
            mixinBack
        ],

        data () {
            return {
                filter: false,
                editors: false
            }
        }

    }

</script>
