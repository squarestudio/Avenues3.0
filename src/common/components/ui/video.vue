<!--
    Styles
-->

<style>


    /* main */

    .ui-video {
        position: relative;
    }
    .ui-video img {
        object-fit: cover;
    }
    .ui-video video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


    /* hd */

    .ui-video.hd:before {
        content: '';
        display: block;
        padding-top: 56.25%; /* 16:9 */
    }
    .ui-video.hd video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


</style>



<!--
    Template
-->

<template>
    <div class="ui-video">
        <img class="u-stretch" :src="poster" v-show="!this.active || !this.canplay">
        <video playsinline @canplay="canplay = true" ref="video" @ended="$emit('end')" />
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
            'paused',
            'active',
            'time'
        ],

        data () {
            return {
                canplay: false
            }
        },

        computed: {

            ...mapState([
                'muted'
            ])

        },

        methods: {

            setSource () {
                if (this.active) {
                    this.$refs.video.src = this.video;
                    if (this.time) this.$refs.video.currentTime = this.time;
                    !this.paused && this.$refs.video.play();
                }
                else {
                    this.canplay = false;
                    this.$refs.video.pause();
                    this.$refs.video.src = '';
                    this.$refs.video.load();
                }
            },

            setPause () {
                if (this.paused) this.$refs.video.pause();
                else if (this.active) this.$refs.video.play();
            },

            setMute () {
                this.$refs.video.muted = this.muted;
            }

        },

        watch: {

            active () {
                this.setSource();
            },

            paused () {
                this.setPause();
            },

            muted () {
                this.setMute();
            }

        },

        mounted () {
            this.setMute();
            this.setSource();
            this.setPause();

        }

    }

</script>
