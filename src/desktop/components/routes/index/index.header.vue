<!--
    Styles
-->

<style scoped>


    /* filter */

    .filter span {
        height: .5rem;
        width: 1px;
        margin: 0 .5rem;
        background: currentColor;
    }


    /* private title */

    .private svg {
        width: 1rem;
        height: 1rem;
        margin-left: .25rem;
        flex-shrink: 0;
    }


    /* invisible filter (private page) */

    .filter.invisible {
        visibility: hidden;
    }


</style>



<!--
    Template
-->

<template>
    <header class="u-grid">


        <!-- logo -->

        <div>
            <router-link class="u-link logo" :to="{name: private ? 'private' : 'home'}">Avenues</router-link>
        </div>


        <!-- index -->

        <div>
            <p v-if="private" class="u-row u-link private">{{ privateInfo.title }}<icon-down /></p>
            <a v-else class="u-link" @click="$emit('back')">Fullscreen</a>
        </div>


        <!-- filter -->

        <div class="filter u-row" :class="{invisible: private}">
            <a @click.stop="$emit('update:editors', true)">{{ filter ? filter : 'Editors'}}</a>
            <span />
            <a @click="$emit('update:filter', false)">All</a>
        </div>


        <!-- sound -->

        <div>
            <ui-sound />
        </div>


    </header>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import uiSound from '@/desktop/components/ui/sound.vue'
    import iconDown from '@/common/assets/icons/down.svg'

    export default {

        components: {
            uiSound,
            iconDown
        },

        props: [
            'filter'
        ],

        computed: {

            ...mapState([
                'private',
                'privateInfo'
            ])

        }


    }

</script>
