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
        <img class="u-stretch" :src="poster" v-show="!this.active || !this.canplay">
        <video @canplay="canplay = true" ref="video" />
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
            'active'
        ],

        data () {
            return {
                canplay: false
            }
        },

        computed: {

            ...mapState('App', [
                'muted'
            ])

        },

        methods: {

            setSource () {
                if (this.active) {
                    this.$refs.video.src = this.video;
                    !this.paused && this.$refs.video.play();
                }
                else {
                    this.canplay = false;
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