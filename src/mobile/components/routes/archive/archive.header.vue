<!--
    Styles
-->

<style scoped>


    /* main */

    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(255,255,255,1);
        transition: background .5s;
        z-index: 1;
    }
    header .u-row {
        padding: var(--padding);
        justify-content: space-between;
    }
    header.contain {
        background: rgba(255,255,255,0);
    }


    /* primary row */

    .primary {
        transition: opacity .5s;
    }
    header.contain .primary {
        opacity: 0;
    }


    /* contain row */

    .secondary {
        color: #FFFFFF;
    }


    /* fade transition */

    .fade-leave, .fade-enter-to {opacity: 1}
    .fade-enter, .fade-leave-to {opacity: 0}
    .fade-enter-active, .fade-leave-active {transition: opacity .5s;}


</style>



<!--
    Template
-->

<template>
    <header :class="{contain}">


        <!-- default -->

        <div class="primary u-row">
            <a>Avenues</a>
            <a>Close</a>
        </div>


        <!-- contain -->

        <transition name="fade">
            <div class="secondary u-row u-stretch" v-show="contain">
                <ui-copy />
                <a @click="$emit('update:contain', false)">Close</a>
            </div>
        </transition>


    </header>
</template>



<!--
    Scripts
-->

<script>

    import uiCopy from '@/mobile/components/ui/copy.vue'

    export default {

        components: {
            uiCopy
        },

        props: [
            'contain'
        ]

    }

</script>