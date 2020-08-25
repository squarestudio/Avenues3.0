<!--
    Styles
-->

<style>

    .l-section header {
        opacity: 0;
    }
    .l-section main {
        opacity: 0;
    }
    .l-section footer {
        opacity: 0;
    }
    
</style>



<!--
    Template
-->

<template>
    <section class="l-section u-stretch u-col" :class="{loaded}">

        <header>
            <slot name="header" />
        </header>

        <main>
            <slot name="main" />
        </main>

        <footer>
            <slot name="footer" />
        </footer>

    </section>
</template>



<!--
    Scripts
-->

<script>

    export default {

        data () {
            return {
                loaded: false
            }
        }

    }

</script>