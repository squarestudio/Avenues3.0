<!--
    Styles
-->

<style>


</style>



<!--
    Template
-->

<template>
    <a class="ui-sound u-link" :class="{active: !muted}" @click="setMuted(!muted)">
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
            ...mapState('App', ['muted'])
        },

        methods: {
            ...mapMutations('App', ['setMuted'])
        }

    }

</script>