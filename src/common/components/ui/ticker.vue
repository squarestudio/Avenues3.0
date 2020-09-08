<!--
    Styles
-->

<style>


    /* default */

    .ui-ticker {
        overflow: hidden;
    }
    .ui-ticker .move {
        display: inline-flex;
    }
    .ui-ticker .move .slot:last-child {
        display: none;
    }


    /* active */

    .ui-ticker.active .move {
        animation: ui-ticker linear infinite;
    }
    .ui-ticker.active .move .slot:last-child {
        display: block;
    }


    /* keyframes */

    @keyframes ui-ticker {
        100% {transform: translateX(-50%);}
    }


</style>



<!--
    Template
-->

<template>
    <div class="ui-ticker" :class="{active: active && duration}">
        <div class="move" :style="{animationDuration: duration}">
            <component class="slot u-row" :is="tag" ref="slot"><slot /></component>
            <component class="slot u-row" :is="tag"><slot /></component>
        </div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: {
            active: Boolean,
            tag: {
                type: String,
                default: 'p'
            }
        },

        data () {
            return {
                duration: ''
            }
        },

        methods: {

            update () {
                const mw = this.$refs.slot.offsetWidth;
                const ew = this.$el.offsetWidth;
                if (this.active && mw > ew) this.duration = mw / 75 + 's';
                else this.duration = '';
            }

        },

        watch: {

            active () {
                this.update();
            }

        },

        mounted () {
            window.addEventListener('resize', this.update);
            this.update();
        },

        destroyed () {
            window.removeEventListener('resize', this.update);
        }

    }

</script>