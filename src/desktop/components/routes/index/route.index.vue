<!--
    Styles
-->

<style>


</style>



<!--
    Template
-->

<template>
    <section id="index" class="u-stretch u-col">
        <index-header :filter.sync="filter" :editors.sync="editors" />
        <index-projects :filter="filter" class="u-flex" />
        <index-footer />
        <index-editors :filter.sync="filter" :editors.sync="editors" />
    </section>
</template>



<!--
    Scripts
-->

<script>

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

        data () {
            return {
                filter: false,
                editors: false
            }
        }

    }

</script>
