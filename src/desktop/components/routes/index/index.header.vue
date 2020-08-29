<!--
    Styles
-->

<style scoped>

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
    
</style>



<!--
    Template
-->

<template>
    <div class="u-grid">


        <!-- logo -->

        <div>
            <router-link :to="{name: private ? 'private' : 'home'}">Avenues</router-link>
        </div>


        <!-- index -->

        <div>
            <router-link :to="{name: private ? 'private' : 'home'}">Fullscreen</router-link>
        </div>


        <!-- editors -->

        <div class="filter u-row">

            <a class="u-row">
                <span>All</span>
                <icon-down />
            </a>

            <a class="u-row" v-for="editor in editors">
                <span>{{editor}}</span>
                <icon-down />
            </a>
        </div>


        <!-- sound -->

        <div>
            <ui-sound />
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapGetters} from 'vuex'
    import uiSound from '@/desktop/components/ui/sound.vue'
    import iconDown from '@/common/icons/down.svg'

    export default {

        components: {
            uiSound,
            iconDown
        },

        data () {
            return {

            }
        },

        computed: {

            ...mapState('App', [
                'home'
            ]),

            ...mapGetters('App', [
                'private'
            ]),

            editors () {
                const editorsRate = this.home.reduce((result, project) => {
                    const editor = project.editor.toLowerCase();
                    result[editor] = result[editor] || 0;
                    result[editor]++
                    return result;
                }, {});
                return Object.keys(editorsRate).sort((a, b) => {
                    if (editorsRate[a] < editorsRate[b]) return -1;
                    if (editorsRate[a] > editorsRate[b]) return -1;
                    return 0;
                }).slice(0, 2);
            }

        },

        methods: {


        },

        mounted() {

        }


    }

</script>