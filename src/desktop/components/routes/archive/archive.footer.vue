<!--
    Styles
-->

<style scoped>


    /* main */

    .footer {
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
    <div class="footer u-grid">
        <div class="title">{{about.title}}</div>
        <div class="u-text" v-html="about.contacts_1"></div>
        <div class="u-text" v-html="about.contacts_2"></div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapGetters} from 'vuex'
    import iconOpen from '@/common/icons/open.svg';

    export default {

        components: {
            iconOpen
        },

        computed: {

            ...mapState('App', [
                'about'
            ]),

            ...mapGetters('App', [
                'private'
            ])

        }

    }

</script>