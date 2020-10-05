<!--
    Styles
-->

<style>

    #index main {
        position: relative;
        overflow: auto;
    }

</style>



<!--
    Template
-->

<template>
    <section id="index" class="u-stretch u-col">
        <index-header :filter.sync="filter" :editors.sync="editors" @back="back" />
        <main class="u-flex">
            <index-projects :filter="filter" />
            <index-editors :filter.sync="filter" :editors.sync="editors" />
        </main>
        <index-footer />
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
