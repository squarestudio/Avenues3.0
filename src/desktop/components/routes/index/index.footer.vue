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


    /* archive */

    .archive svg {
        width: 1rem;
        height: 1rem;
        margin-left: .25rem;
        flex-shrink: 0;
    }
    
</style>



<!--
    Template
-->

<template>
    <footer class="u-grid">


        <!-- texts -->

        <div class="title" v-html="about.title"></div>
        <div class="u-text" v-html="about.contacts_1"></div>
        <div class="u-text" v-html="about.contacts_2"></div>


        <!-- archive -->

        <div>
            <router-link class="archive u-link u-row" v-if="!private" :to="{name: 'archive'}">
                <span>Archive</span>
                <icon-open />
            </router-link>
        </div>


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
            'about',
            'private'
        ])

    }

</script>