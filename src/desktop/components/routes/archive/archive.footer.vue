<!--
    Styles
-->

<style scoped>


    /* main */

    footer {
        align-items: end;
        padding-top: 4rem;
    }


    /* title */

    .title {
        padding-right: 15%;
    }


</style>



<!--
    Template
-->

<template>
    <footer class="u-grid">
        <div class="title" v-html="about.desktop_title"></div>
        <div class="u-text" v-html="about.contacts_1"></div>
        <div class="u-text" v-html="about.contacts_2"></div>
    </footer>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import iconOpen from '@/common/assets/icons/open.svg';

    export default {

        components: {
            iconOpen
        },

        computed: mapState([
            'about'
        ])

    }

</script>
