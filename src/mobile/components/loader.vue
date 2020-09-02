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
    #loader .test {
        position: absolute;
        visibility: hidden;
    }

</style>



<!--
    Template
-->

<template>
    <div id="loader" class="u-stretch">
        <div class="test" ref="row">Avenues</div>
        <div v-for="n in rows">Avenues</div>
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
                rows: this.rowsMin,
                animation: new Animation({
                    from: 1,
                    duration: 1000,
                    update: this.update
                })
            }
        },

        computed: {

            id () {
                return this.$route.params.id;
            },

            rowsMin () {
                return this.$route.query.contain ? 0 : 1
            }

        },

        methods: {

            ...mapMutations([
                'set'
            ]),

            animate (to) {
                this.animation.to(to).start();
                !to && this.animation.complete(this.complete);
            },

            update (value) {
                this.rows = this.rowsMin + Math.round((this.rowsTotal - this.rowsMin) * value);
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
                const row = this.$refs.row.offsetHeight;
                this.rows = this.rowsTotal = Math.floor(col / row) * 4;
            }

        },

        async mounted () {

            await Auth(this.id);

            if (Cache.valid(this.id)) {
                this.rows = this.rowsMin;
                this.set(Cache.get());
                this.set({loaded: true});
                return;
            }

            this.normalizeRows();
            this.animate(0.8);
            this.bitrate = await BitRate(1000);

            this.animate(0.5);
            this.data = await Request(this.id, this.bitrate);

            Preload(this.data, value => this.animate(0.5 - 0.5 * value));

        }

    }

</script>