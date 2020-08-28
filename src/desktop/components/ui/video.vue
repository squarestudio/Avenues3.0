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
    .ui-video.active img {
        opacity: 0;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="ui-video" :class="{active: !paused && canplay}">
        <img class="u-stretch" :src="poster" />
        <video ref="video" @canplay="play" />
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

        data () {
            return {
                canplay: false
            }
        },

        methods: {

            play () {
                this.canplay = true;
            },

            setPause () {
                if (this.paused) {
                    this.canplay = false;
                    this.$refs.video.src = '';
                    this.$refs.video.load();
                }
                else {
                    this.$refs.video.src = this.video;
                    this.$refs.video.load();
                    this.$refs.video.play();
                }
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