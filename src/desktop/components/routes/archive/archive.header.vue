<!--
    Styles
-->

<style scoped>


    /* main */

    header {
        padding-bottom: 3.5rem;
    }


    /* search */

    .search input {
        width: 100%;
    }
    .search input::placeholder {
        color: currentColor;
    }
    .search input:focus {
        opacity: 0.5;
    }


    /* close */

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
    <header class="u-grid">


        <!-- logo -->

        <div>
            <router-link class="u-link logo" :to="{name: 'home'}">Avenues</router-link>
        </div>


        <!-- Search -->

        <div class="search u-row">
            <input type="text" placeholder="Search" @input="input" :value="search">
        </div>


        <!-- sound -->

        <div>
            <ui-sound />
        </div>


        <!-- close -->

        <div>
            <router-link class="close u-row u-link" :to="{name: back}">
                <span>Close archive</span>
                <icon-close />
            </router-link>
        </div>


    </header>
</template>



<!--
    Scripts
-->

<script>

    import {mapGetters} from 'vuex'
    import uiSound from '@/desktop/components/ui/sound.vue'
    import iconClose from '@/common/assets/icons/close.svg'
    import iconRight from '@/common/assets/icons/right.svg'

    export default {

        components: {
            uiSound,
            iconClose,
            iconRight
        },

        props: [
            'search'
        ],

        computed: {

            ...mapGetters([
                'back'
            ])

        },

        methods: {

            input (event) {
                this.$emit('update:search', event.target.value.toLowerCase());
            }

        }


    }

</script>
