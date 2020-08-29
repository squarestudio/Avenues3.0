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
        overflow: hidden;
    }
    .l-loader.index,
    .l-loader.archive {
        background: #FFFFFF;
        color: #000000;
    }
    .l-loader.private-index {
        background: #A86F6F;
        color: #000000;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="l-loader u-stretch" :class="$route.name">
        <div>Avenues</div>
        <div v-for="n in rows" ref="row">Avenues</div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapActions, mapMutations, mapState, mapGetters} from 'vuex'
    import API from '@/desktop/common/modules/api';
    import Animation from '@/common/scripts/animation';

    export default {

        data () {
            return {
                animation: new Animation(1),
                cache: JSON.parse(localStorage.getItem('cache')),
                rows: 400
            }
        },

        computed: {

            ...mapGetters('App', [
                'private',
                'assetsProgress'
            ]),

            ...mapState('App', [
                'about',
                'home',
                'archive'
            ])

        },

        methods: {


            // vuex

            ...mapActions('App', [
                'getBitRate',
                'getData',
                'loadAssets'
            ]),

            ...mapMutations('App', [
                'setState'
            ]),


            // animation callbacks

            update (value) {
                this.rows = Math.round(this.rowsTotal * value);
            },

            complete () {
                this.setState({loaded: true});
                this.setCache();
            },

            progress (value) {
                const to = 0.5 - 0.5 * value;
                if (value === 1) this.animation.to(to, 1000, this.update, this.complete);
                else this.animation.to(to, 1000, this.update);
            },


            // cache

            isCached () {
                return this.cache && Date.now() - this.cache.timestamp < 60 * 60 * 1000 && (this.$route.params.id || 0) === this.cache.id
            },

            applyCache () {
                this.rows = 0;
                this.setState({
                    about: this.cache.about,
                    home: this.cache.home,
                    archive: this.cache.archive,
                    loaded: true
                });
            },

            setCache () {
                localStorage.setItem('cache', JSON.stringify({
                    id: this.$route.params.id || 0,
                    timestamp: Date.now(),
                    about: this.about,
                    home: this.home,
                    archive: this.archive
                }))
            },


            // authentication

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
                    setTimeout(resolve); // for section transition
                });
            },


            // normalize rows

            normalizeRows () {
                const style = getComputedStyle(this.$el);
                const top = style.getPropertyValue('padding-top');
                const bottom = style.getPropertyValue('padding-bottom');
                const col = this.$el.offsetHeight - parseFloat(top) - parseFloat(bottom);
                const row = this.$refs.row[0].offsetHeight;
                this.rows = this.rowsTotal = Math.floor(col / row) * 4 - 1;
            }

        },

        async mounted () {
            await this.auth();
            if (this.isCached()) return this.applyCache();
            this.normalizeRows();
            this.animation.to(0.8, 1000, this.update);
            await this.getBitRate(1000);
            this.animation.to(0.5, 1000, this.update);
            await this.getData();
            this.$watch('assetsProgress', this.progress);
            this.loadAssets();
        }

    }

</script>