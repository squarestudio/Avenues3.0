<!--
    Styles
-->

<style>

    
    
</style>



<!--
    Template
-->

<template>
    <a @click="copy">{{ copied ? 'Link copied' : 'Copy link'}}</a>
</template>



<!--
    Scripts
-->

<script>

    export default {

        data () {
            return {
                copied: false
            }
        },

        methods: {

            copy () {
                if (this.copied) return;
                navigator.clipboard.writeText(location.href);
                this.copied = true;
            },

            reset () {
                this.copied = false;
            }

        }

    }

</script>