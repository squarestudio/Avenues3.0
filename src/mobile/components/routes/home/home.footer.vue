<!--
    Styles
-->

<style scoped>

    footer {
        padding: var(--padding);
        justify-content: flex-end;
    }
    footer .u-text:first-child {
        margin-bottom: 1rem;
    }

</style>



<!--
    Template
-->

<template>
    <footer class="u-col th-white">
        <div class="u-text" v-html="about.contacts_1" />
        <div class="u-text" v-html="about.contacts_2" />
    </footer>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'

    export default {

        computed: {

            ...mapState([
                'about'
            ])

        }

    }

</script>