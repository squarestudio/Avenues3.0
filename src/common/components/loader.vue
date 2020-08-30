<!--
    Styles
-->

<style>

    #loader {
        column-count: 4;
        column-gap: var(--padding);
        column-fill: auto;
        padding: var(--padding);
        overflow: hidden;
    }

</style>



<!--
    Template
-->

<template>
    <div id="loader" class="u-stretch">
        <div>Avenues</div>
        <div v-for="n in rows" ref="row">Avenues</div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapMutations} from 'vuex'
    import Animation from '@/common/scripts/utils/animation';
    import {Auth, BitRate, Request, Cache, Preload} from '@/common/scripts/utils/loader';

    export default {

        data () {
            return {
                rows: 400,
                animation: new Animation(1)
            }
        },

        computed: {

            id () {
                return this.$route.params.id;
            }

        },

        methods: {

            ...mapMutations([
                'set'
            ]),

            animate (to) {
                this.animation.to(to, 1000, this.update, !to && this.complete);
            },

            update (value) {
                this.rows = Math.round(this.rowsTotal * value);
            },

            complete () {
                Cache.set(this.data, this.id);
                this.set(this.data);
                this.set({loaded: true});
            },

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

            this.normalizeRows();
            await Auth(this.id);

            if (Cache.valid(this.id)) {
                this.rows = 0;
                this.set(Cache.get());
                this.set({loaded: true});
                return;
            }

            this.animate(0.8);
            this.bitrate = await BitRate(1000);

            this.animate(0.5);
            this.data = await Request(this.id, this.bitrate);

            Preload(this.data, value => this.animate(0.5 - 0.5 * value));

        }

    }

</script>