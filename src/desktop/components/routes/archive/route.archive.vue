<!--
    Styles
-->

<style>

    #archive {
        overflow: auto;
    }
    #archive .stick {
        background: inherit;
        position: sticky;
        top: 0;
    }
    #archive .row {
        padding-top: .6rem;
        padding-bottom: .6rem;
        border-bottom: 1px solid #000000;
    }

</style>



<!--
    Template
-->

<template>
    <section id="archive" class="u-stretch u-col">

        <div class="stick">
            <archive-header :search.sync="search" @back="back" />
            <archive-sort :sort.sync="sort" />
        </div>

        <archive-main :sort="sort" :search="search" class="u-flex" />
        <archive-footer />

    </section>
</template>



<!--
    Scripts
-->

<script>

    import mixinBack from '@/common/scripts/mixins/back'
    import archiveHeader from './archive.header.vue'
    import archiveSort from './archive.sort.vue'
    import archiveMain from './archive.main.vue'
    import archiveFooter from './archive.footer.vue'

    export default {

        components: {
            archiveHeader,
            archiveSort,
            archiveMain,
            archiveFooter
        },

        mixins: [
            mixinBack
        ],

        data () {
            return {
                sort: false,
                search: ''
            }
        }


    }

</script>