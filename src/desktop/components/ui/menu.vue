<!--
    Styles
-->

<style>

    .ui-menu .target {
        cursor: pointer;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="ui-menu">

        <div class="target" ref="target" @mouseenter="targetEnter" @mouseleave="targetLeave">
            <div class="u-text" v-html="target" />
        </div>

        <div class="source" ref="source" @mouseleave="targetLeave">
            <div class="u-text" v-html="source" />
        </div>

    </div>
</template>



<!--
    Scripts
-->

<script>

    function hasParent ($node, $parent) {
        while ($node) {
            if ($node === $parent) return true;
            $node = $node.parentNode;
        }
        return false;
    }

    export default {

        props: [
            'source',
            'target',
            'active'
        ],

        methods: {

            targetEnter () {
                this.update(true);
            },

            targetLeave (event) {
                if (!hasParent(event.relatedTarget, event.currentTarget.nextElementSibling)) this.update(false);
            },

            sourceLeave (event) {
                if (!hasParent(event.relatedTarget, event.currentTarget.previousElementSibling)) this.update(false);
            },

            update (value) {
                this.$emit(value ? 'enter' : 'leave');
                this.$emit('update:active', value);
            }

        }

    }

</script>