<!--
    Styles
-->

<style>

    #archive {
        color: #000;
    }
    #archive .l-scroll {
        overflow: auto;
        border-bottom: 1px solid #000;
    }
    #archive .l-bg {
        background: #FFFFFF;
        z-index: -1;
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
    <ui-section id="archive" class="u-stretch u-col">
        <archive-header class="l-header" @back="back" />
        <archive-sort class="l-content" />
        <div class="l-scroll l-content u-flex">
            <archive-main />
        </div>
        <archive-footer class="l-footer" />
        <div class="l-bg u-stretch l-content"></div>
    </ui-section>
</template>



<!--
    Scripts
-->

<script>

    import uiSection from '@/desktop/components/ui/section.vue'
    import archiveHeader from './archive.header.vue'
    import archiveSort from './archive.sort.vue'
    import archiveMain from './archive.main.vue'
    import archiveFooter from './archive.footer.vue'

    export default {

        components: {
            uiSection,
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