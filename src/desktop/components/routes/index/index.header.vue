<!--
    Styles
-->

<style scoped>


    /* filter */

    .filter a {
        white-space: nowrap;
    }
    .filter a svg {
        opacity: 0;
        width: 1rem;
        height: 1rem;
        margin: 0 .2rem;
        transition: opacity .3s ease;
    }
    .filter a:hover svg {
        opacity: 1;
    }
    .filter a.active svg {
        opacity: 1;
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


        <!-- editors -->

        <div class="filter u-row" :class="{invisible: private}">

            <a class="u-row" @click="$emit('update:filter', false)" :class="{active: !filter}">
                <span>All</span>
                <icon-down />
            </a>

            <a class="u-row" v-for="editor in editors" :class="{active: filter === editor}" @click="$emit('update:filter', editor)">
                <span>{{editor}}</span>
                <icon-down />
            </a>

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
                'home',
                'private',
                'privateInfo'
            ]),

            editors () {

                const editorsRate = this.home.reduce((result, project) => {
                    result[project.editor] = result[project.editor] || 0;
                    result[project.editor]++
                    return result;
                }, {});

                return Object.keys(editorsRate).sort((a, b) => {
                    if (editorsRate[a] < editorsRate[b]) return -1;
                    if (editorsRate[a] > editorsRate[b]) return 1;
                    return 0;
                }).slice(0, 2);

            }

        }


    }

</script>