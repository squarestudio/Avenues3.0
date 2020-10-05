<!--
    Styles
-->

<style scoped>

    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: var(--padding);
        color: #FFFFFF;
    }
    header .u-row {
        justify-content: space-between;
    }

</style>



<!--
    Template
-->

<template>
    <header>
        <div class="u-row loader-sync">
            <ui-copy ref="copy" />
            <a @click="$emit('update:contain', false)">Close</a>
        </div>
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
            'active'
        ],

        watch: {

            active () {
                this.$refs.copy && this.$refs.copy.reset();
            }

        }

    }

</script>
