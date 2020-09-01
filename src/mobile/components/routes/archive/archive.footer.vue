<!--
    Styles
-->

<style scoped>

    footer {
        height: 100%;
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
    <footer class="u-col">
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