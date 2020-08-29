<!--
    Styles
-->

<style>

    .ui-video {
        position: relative;
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
        <video ref="video" :src="video" :poster="poster" />
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
            'poster',
            'paused'
        ],

        computed: {

            ...mapState('App', [
                'muted'
            ])

        },

        methods: {

            setPause () {
                if (this.paused) this.$refs.video.pause();
                else this.$refs.video.play();
            },

            setMute () {
                this.$refs.video.muted = this.muted;
            }

        },

        watch: {

            paused () {
                this.setPause();
            },

            muted () {
                this.setMute();
            }

        },

        mounted () {
            this.setMute();
            this.setPause();
        }

    }

</script>