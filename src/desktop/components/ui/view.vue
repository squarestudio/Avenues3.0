<!--
    Styles
-->

<style>


    /* common */

    .ui-view {
        position: relative;
        width: 1rem;
        height: 1rem;
    }
    .ui-view .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin: -8px 0 0 -8px;
    }
    .ui-view span {
        position: absolute;
        background: currentColor;
        transition: transform 0.3s ease;
    }
    .ui-view span.hor {
        width: 4px;
        height: 1px;
    }
    .ui-view span.ver {
        width: 1px;
        height: 4px;
    }


    /* icon lines */

    .ui-view span:nth-child(1) {
        top: 2px; left: 2px;
        transform-origin: 0.5px 0.5px;
    }
    .ui-view span:nth-child(2) {
        top: 2px; left: 2px;
        transform-origin: 0.5px 0.5px;
    }
    .ui-view span:nth-child(3) {
        bottom: 2px; left: 2px;
        transform-origin: 0.5px 0.5px;
    }
    .ui-view span:nth-child(4) {
        bottom: 2px; left: 2px;
        transform-origin: 0.5px 3.5px;
    }
    .ui-view span:nth-child(5) {
        top: 2px; right: 2px;
        transform-origin: 3.5px 0.5px;
    }
    .ui-view span:nth-child(6) {
        top: 2px; right: 2px;
        transform-origin: 0.5px 0.5px;
    }
    .ui-view span:nth-child(7) {
        bottom: 2px; right: 2px;
        transform-origin: 3.5px 0.5px;
    }
    .ui-view span:nth-child(8) {
        bottom: 2px; right: 2px;
        transform-origin: 0.5px 3.5px;
    }


    /* icon active lines */

    .ui-view.active span:nth-child(1) {
        transform: translate(4px, 4px) rotate(-90deg);
    }
    .ui-view.active span:nth-child(2) {
        transform: translate(4px, 4px) rotate(90deg);
    }
    .ui-view.active span:nth-child(3) {
        transform: translate(4px, -4px) rotate(90deg);
    }
    .ui-view.active span:nth-child(4) {
        transform: translate(4px, -4px) rotate(-90deg);
    }
    .ui-view.active span:nth-child(5) {
        transform: translate(-4px, 4px) rotate(90deg);
    }
    .ui-view.active span:nth-child(6) {
        transform: translate(-4px, 4px) rotate(-90deg);
    }
    .ui-view.active span:nth-child(7) {
        transform: translate(-4px, -4px) rotate(-90deg);
    }
    .ui-view.active span:nth-child(8) {
        transform: translate(-4px, -4px) rotate(90deg);
    }


</style>



<!--
    Template
-->

<template>
    <a class="ui-view" :class="{active}">
        <div class="icon" :style="{transform}">
            <span class="hor"></span>
            <span class="ver"></span>
            <span class="hor"></span>
            <span class="ver"></span>
            <span class="hor"></span>
            <span class="ver"></span>
            <span class="hor"></span>
            <span class="ver"></span>
        </div>
    </a>
</template>



<!--
    Script
-->

<script>

    const iconSize = 16; // .icon width

    export default {

        props: [
            'active'
        ],

        data () {
            return {
                transform: null
            }
        },

        methods: {

            resize () {
                this.transform = `scale(${this.$el.offsetWidth / iconSize})`;
            }

        },

        mounted () {
            window.addEventListener('resize', this.resize);
            this.resize();
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>