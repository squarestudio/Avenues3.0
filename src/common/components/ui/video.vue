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
        position: relative;
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
        <img class="u-stretch" :src="poster">
        <video playsinline v-if="active" :src="video" @loadstart="start" ref="video" @ended="$emit('end')"  />
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

        computed: {

            ...mapState([
                'muted'
            ])

        },

        methods: {

            start () {
                this.setMute();
                this.setTime();
                this.setPause();
                this.$emit('ready', this.$refs.video);
            },

            setSource () {
                if (this.$refs.video || this.active) return;
                this.$refs.video.pause();
                this.$refs.video.src = '';
                this.$refs.video.load();
            },

            setTime () {
                if (!this.$refs.video || !this.time) return;
                this.$refs.video.currentTime = this.time;
            },

            setPause () {
                if (!this.$refs.video) return;
                if (this.paused) this.$refs.video.pause();
                else this.$refs.video.play();
            },

            setMute () {
                if (!this.$refs.video) return;
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

        }

    }

</script>
