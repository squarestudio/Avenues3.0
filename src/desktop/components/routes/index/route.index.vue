<!--
    Styles
-->

<style>

    #index {
        background: #FFF;
        color: #000;
    }

</style>



<!--
    Template
-->

<template>
    <layout-section id="index">

        <template #header>
            <index-header />
        </template>

        <template #main>

        </template>

        <template #footer>
            <index-footer />
        </template>

    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import layoutSection from '@/desktop/components/layout/section.vue'
    import indexHeader from './index.header.vue'
    import indexFooter from './index.footer.vue'

    export default {

        components: {
            layoutSection,
            indexHeader,
            indexFooter
        }

    }

</script>