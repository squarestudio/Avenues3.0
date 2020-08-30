<!--
    Styles
-->

<style>

    #index {
        overflow: auto;
    }

</style>



<!--
    Template
-->

<template>
    <section id="index" class="u-stretch u-col">
        <index-header :filter.sync="filter" @back="back" />
        <index-main :filter="filter" class="u-flex" />
        <index-footer />
    </section>
</template>



<!--
    Scripts
-->

<script>

    import mixinBack from '@/common/scripts/mixins/back'
    import indexHeader from './index.header.vue'
    import indexMain from './index.main.vue'
    import indexFooter from './index.footer.vue'

    export default {

        components: {
            indexHeader,
            indexMain,
            indexFooter
        },

        mixins: [
            mixinBack
        ],

        data () {
            return {
                filter: false
            }
        }

    }

</script>