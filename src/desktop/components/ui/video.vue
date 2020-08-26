<!--
    Styles
-->

<style>

    .ui-video {
        position: relative;
    }
    .ui-video img {
        object-fit: cover;
    }
    .ui-video video {
        width: 100%;
        height: 100%;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="ui-video">
        <img class="u-stretch" :src="poster" />
        <video :src="video" />
    </div>
    
    
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'

    export default {

        props: [
            'video',
            'poster'
        ],

        computed: {

            ...mapState('App', [
                'muted'
            ])

        }

    }

</script>