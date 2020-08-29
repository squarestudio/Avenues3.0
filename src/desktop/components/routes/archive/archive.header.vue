<!--
    Styles
-->

<style scoped>

    .close svg {
        width: 1rem;
        height: 1rem;
        margin-left: .25rem;
        flex-shrink: 0;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="u-grid">


        <!-- logo -->

        <div>
            <router-link :to="{name: 'home'}">Avenues</router-link>
        </div>


        <!-- Search -->

        <div>
            <a>Search</a>
        </div>


        <!-- sound -->

        <div>
            <ui-sound />
        </div>


        <!-- close -->

        <div>
            <a class="close u-row" @click="$emit('back')">
                <span>Close archive</span>
                <icon-close />
            </a>
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapGetters} from 'vuex'
    import uiSound from '@/desktop/components/ui/sound.vue'
    import iconClose from '@/common/icons/close.svg'

    export default {

        components: {
            uiSound,
            iconClose
        }


    }

</script>