<!--
    Styles
-->

<style>

    .l-loader {
        column-count: 4;
        column-gap: var(--padding);
        column-fill: auto;
        padding: var(--padding);
        background: #000000;
    }
    .l-loader .col {
        overflow: hidden;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="l-loader u-stretch">
        <div>Avenues</div>
        <div v-for="n in rows" ref="row">Avenues</div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapActions, mapMutations, mapGetters} from 'vuex'
    import API from '@/desktop/common/modules/api';
    import Animation from '@/common/scripts/animation';

    export default {

        data () {
            return {
                animation: new Animation(1),
                rows: 400,
                loaded: 0
            }
        },

        computed: {

            ...mapGetters('App', [
                'private',
                'images',
                'videos'
            ]),

            filesLength () {
                return this.videos.length + this.images.length;
            }

        },

        methods: {

            ...mapActions('App', [
                'getBitRate',
                'getData',
                'setVideoSize'
            ]),

            update (value) {
                this.rows = Math.round(this.rowsTotal * value);
            },

            complete () {
                console.log('done');
            },

            normalizeRows () {
                const style = getComputedStyle(this.$el);
                const top = style.getPropertyValue('padding-top');
                const bottom = style.getPropertyValue('padding-bottom');
                const col = this.$el.offsetHeight - parseFloat(top) - parseFloat(bottom);
                const row = this.$refs.row[0].offsetHeight;
                this.rows = this.rowsTotal = Math.floor(col / row) * 4 - 1;
            },

            loadImage (src) {
                const $image = new Image();
                $image.addEventListener('load', () => this.loaded++);
                $image.src = src;
            },

            loadVideo (src) {
                const $video = document.createElement('video');
                $video.addEventListener('canplaythrough', () => {
                    this.loaded++;
                    this.setVideoSize($video);
                    document.body.removeChild($video);
                })
                $video.style.display = 'none';
                $video.src = src;
                $video.load();
                document.body.appendChild($video);
            },

            getPassword () {
                const password = window.prompt('Password');
                if (!password) this.getPassword();
                return password;
            },

            login (resolve) {
                API('login', this.getPassword(), this.private.params.id).then(data => {
                    if (data.length) return resolve();
                    else return this.login(resolve);
                });
            },

            auth () {
                return new Promise(resolve => {
                    if (this.private) this.login(resolve);
                    else resolve();
                });
            }

        },

        watch: {

            loaded (value) {
                const to = 0.5 - 0.5 * value / this.filesLength;
                if (value === this.filesLength) this.animation.to(to, 1000, this.update, this.complete);
                else this.animation.to(to, 1000, this.update);
            }

        },

        mounted () {
            this.normalizeRows();
            this.auth()
                .then(() => {
                    this.animation.to(0.8, 1000, this.update);
                    return this.getBitRate(1000);
                })
                .then(() => {
                    this.animation.to(0.5, 1000, this.update);
                    return this.getData();
                })
                .then(() => {
                    this.videos.forEach(this.loadVideo);
                    this.images.forEach(this.loadImage);
                })
        }

    }

</script>