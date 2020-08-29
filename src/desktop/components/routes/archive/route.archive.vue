<!--
    Styles
-->

<style>

    #archive {
        background: #FFF;
        color: #000;
    }
    #archive header {
        position: sticky;
        top: 0;
        flex-shrink: 0;
        z-index: 2; /* above projects */
        background: #FFFFFF;
    }
    #archive .row {
        padding-top: .4rem;
        padding-bottom: .4rem;
        border-bottom: 1px solid #000000;
    }

</style>



<!--
    Template
-->

<template>
    <layout-section id="archive">

        <template #header>
            <archive-header @back="back" />
        </template>

        <template #main>
            <archive-main />
        </template>

        <template #footer>
            <archive-footer />
        </template>

    </layout-section>
</template>



<!--
    Scripts
-->

<script>

    import layoutSection from '@/desktop/components/layout/section.vue'
    import archiveHeader from './archive.header.vue'
    import archiveSort from './archive.sort.vue'
    import archiveMain from './archive.main.vue'
    import archiveFooter from './archive.footer.vue'

    export default {

        components: {
            layoutSection,
            archiveHeader,
            archiveSort,
            archiveMain,
            archiveFooter
        },

        data () {
            return {
                canGoBack: false
            }
        },

        beforeRouteEnter (to, from, next) {
            next(vm => vm.canGoBack = !!from.name);
        },

        methods: {

            back () {
                if (this.canGoBack) this.$router.back();
                else this.$router.push('/');
            }

        }

    }

</script>