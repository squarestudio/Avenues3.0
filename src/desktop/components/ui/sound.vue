<!--
    Styles
-->

<style>


</style>



<!--
    Template
-->

<template>
    <a class="ui-sound u-link" @click="set({muted: !muted})">
        <span>Sound {{muted ? 'On' : 'Off'}}</span>
    </a>
</template>



<!--
    Script
-->

<script>

    import {mapState, mapMutations} from 'vuex'

    export default {

        computed: {
            ...mapState(['muted'])
        },

        methods: {
            ...mapMutations(['set'])
        }

    }

</script>