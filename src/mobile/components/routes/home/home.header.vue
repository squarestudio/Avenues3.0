<!--
    Styles
-->

<style scoped>


    /* overlay */

    .overlay {
        background: rgba(0,0,0,.5);
    }


    /* menu */

    .menu {
        position: fixed;
        justify-content: space-between;
        padding: var(--padding);
        transition: transform .5s;
        transform: translateY(calc(-100% + var(--padding) + var(--padding) + 1rem));
    }
    .menu .u-text {
        width: 75%;
    }
    .menu.active {
        transform: translateY(0);
    }


    /* view */

    .view {
        position: fixed;
        top: var(--padding);
        right: var(--padding);
    }


    /* copy */

    .copy {
        position: fixed;
        top: var(--padding);
        left: var(--padding);
    }


    /* archive */

    .archive {
        position: fixed;
        bottom: var(--padding);
        right: var(--padding);
    }
    .archive svg {
        width: 1rem;
        height: 1rem;
        margin-left: .25rem;
        flex-shrink: 0;
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
    <header>


        <!-- overlay -->

        <transition name="fade">
            <div class="overlay u-stretch" v-show="menu"></div>
        </transition>


        <!-- menu -->

        <transition name="fade">
            <div class="menu u-stretch u-col" v-show="!contain" :class="{active: menu}">

                <div class="u-text">
                    <span>Avenues is</span>
                    <span v-html="about.title"></span>
                    <span v-html="about.description"></span>
                </div>

                <a @click="toggleMenu">{{ menu ? 'Close' : 'Avenues' }}</a>

            </div>
        </transition>


        <!-- view -->

        <transition name="fade">
            <ui-view
                class="view"
                v-show="!menu"
                :active="contain"
                @click.native="$emit('update:contain', !contain)"
            />
        </transition>


        <!-- copy -->

        <transition name="fade">
            <ui-copy class="copy" v-show="contain" />
        </transition>


        <!-- archive -->

        <transition name="fade">
            <a class="archive u-row" v-show="menu">
                <span>Archive</span>
                <icon-open />
            </a>
        </transition>


    </header>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import uiView from '@/common/components/ui/view.vue'
    import uiCopy from '@/mobile/components/ui/copy.vue'
    import iconOpen from '@/common/assets/icons/open.svg'

    export default {

        components: {
            uiView,
            uiCopy,
            iconOpen
        },

        props: [
            'contain'
        ],

        data () {
            return {
                menu: false
            }
        },

        computed: {

            ...mapState([
                'about'
            ])

        },

        methods: {

            toggleMenu () {
                this.menu = !this.menu;
            }

        }

    }

</script>