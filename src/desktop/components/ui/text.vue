<!--
    Styles
-->

<style>

    
    
</style>



<!--
    Template
-->

<template>
    <div class="ui-text u-text" :inner-html.prop="text | parse" />
</template>



<!--
    Scripts
-->

<script>

    import Vue from "vue";

    export default {

        props: [
            'text'
        ],

        filters: {

            parse (text) {
                return text && text.replace(/\n/g, '<br>');
            }

        }

    }

</script>