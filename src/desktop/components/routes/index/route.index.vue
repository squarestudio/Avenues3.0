<!--
    Styles
-->

<style>

    #index {
        color: #000;
    }
    #index .l-bg {
        background: #FFFFFF;
        z-index: -1;
    }

</style>



<!--
    Template
-->

<template>
    <ui-section id="index" class="u-stretch u-col">

        <index-header class="l-header" />
        <index-main class="l-content u-flex" />
        <index-footer class="l-footer" />
        <div class="l-bg u-stretch l-content"></div>

    </ui-section>
</template>



<!--
    Scripts
-->

<script>

    import uiSection from '@/desktop/components/ui/section.vue'
    import indexHeader from './index.header.vue'
    import indexMain from './index.main.vue'
    import indexFooter from './index.footer.vue'

    export default {

        components: {
            uiSection,
            indexHeader,
            indexMain,
            indexFooter
        }

    }

</script>