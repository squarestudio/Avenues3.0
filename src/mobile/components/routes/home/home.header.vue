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
        transition: opacity .5s, transform .5s;
        transform: translateY(calc(-100% + var(--padding) + var(--padding) + 1rem));
    }
    .menu .u-text {
        width: 75%;
    }
    .menu .u-link {
        align-self: flex-start;
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

                <a class="u-link" @click="toggleMenu">{{ menu ? 'Close' : 'Avenues' }}</a>

            </div>
        </transition>


        <!-- view -->

        <transition name="fade">
            <ui-view
                class="view loader-sync"
                v-show="!menu"
                :active="contain"
                @click.native="$emit('update:contain', !contain)"
            />
        </transition>


        <!-- copy -->

        <transition name="fade">
            <ui-copy class="copy loader-sync" v-show="contain" ref="copy" />
        </transition>


        <!-- archive -->

        <transition name="fade">
            <router-link :to="{name: 'archive'}" class="archive u-row" v-show="menu">
                <span>Archive</span>
                <icon-open />
            </router-link>
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
            'contain',
            'menu',
            'index'
        ],

        computed: {

            ...mapState([
                'about'
            ])

        },

        methods: {

            toggleMenu () {
                this.$emit('update:menu', !this.menu);
            }

        },

        watch: {

            contain (value) {
                value && this.$refs.copy.reset();
            },

            index () {
                this.$refs.copy.reset();
            }

        }

    }

</script>