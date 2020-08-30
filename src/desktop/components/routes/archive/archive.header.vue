<!--
    Styles
-->

<style scoped>


    /* search */

    .search {
        overflow: hidden;
    }
    .search p {
        position: absolute;
        visibility: hidden;
        white-space: nowrap;
        z-index: -1;
        padding-right: .25rem;
    }
    .search svg {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        opacity: 0;
        transition: opacity .3s ease;
    }
    .search input::placeholder {
        color: currentColor;
        transition: opacity .3s ease;
    }
    .search input:focus {
        opacity: 0.5;
    }
    .search input:focus + svg {
        opacity: 1;
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
            <p ref="searchMin">Search</p>
            <p ref="searchMax">{{ search }}</p>
            <input type="text" placeholder="Search" @input="input" @focus="resize" :value="search" :style="{width: searchWidth}">
            <icon-right />
        </div>


        <!-- sound -->

        <div>
            <ui-sound />
        </div>


        <!-- close -->

        <div>
            <a class="close u-row u-link" @click="$emit('back')">
                <span>Close archive</span>
                <icon-close />
            </a>
        </div>


    </header>
</template>



<!--
    Scripts
-->

<script>

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

        data () {
            return {
                searchWidth: ''
            }
        },

        methods: {

            input (event) {
                this.$emit('update:search', event.target.value.toLowerCase());
                this.$nextTick(this.resize);
            },

            resize () {
                const min = this.$refs.searchMin.offsetWidth;
                const max = this.$refs.searchMax.offsetWidth;
                this.searchWidth = Math.max(max, min) + 'px';
            }

        }


    }

</script>