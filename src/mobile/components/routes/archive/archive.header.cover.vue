<!--
    Styles
-->

<style scoped>

    header {
        padding: var(--padding);
        justify-content: space-between;
    }

</style>



<!--
    Template
-->

<template>
    <header class="u-row">
        <a @click="open('home')">Avenues</a>
        <a @click="open('home')" class="loader-sync">Close</a>
    </header>
</template>



<!--
    Scripts
-->

<script>

    export default {

        methods: {

            open (name) {
                this.$router.push({name});
            }

        }

    }

</script>
