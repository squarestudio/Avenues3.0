<!--
    Styles
-->

<style>


    /* main */

    #archive {
        overflow: auto;
        transition: background .5s;
    }
    #archive main {
        padding-top: 4rem;
    }
    #archive .row {
        padding: var(--padding);
        border-bottom: 1px solid #000;
        white-space: nowrap;
        overflow: hidden;
    }


    /* contain */

    #archive.contain {
        background: #000;
        overflow: hidden;
    }
    #archive.contain main {
        pointer-events: none;
    }


</style>



<!--
    Template
-->

<template>
    <section id="archive" class="th-white u-stretch" :class="{contain}">

        <archive-header :contain.sync="contain" />

        <main>
            <archive-filters :sort.sync="sort" :search.sync="search" />
            <archive-projects :index.sync="index" :contain.sync="contain" :video.sync="video" @scroll="scroll" />
            <archive-footer />
        </main>

        <ui-controls :bar="true" :projects="archive" :index="index" :video="video" />

    </section>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import Animation from '@/common/scripts/utils/animation';
    import archiveHeader from './archive.header.vue'
    import archiveFilters from './archive.filters.vue'
    import archiveProjects from './archive.projects.vue'
    import archiveFooter from './archive.footer.vue'
    import uiControls from '@/mobile/components/ui/controls.vue'

    export default {

        components: {
            archiveHeader,
            archiveFilters,
            archiveProjects,
            archiveFooter,
            uiControls
        },

        data () {
            return {
                sort: false,
                search: '',
                video: {},
                animation: new Animation({
                    easing: 'inOut',
                    update: this.setScroll
                }),
            }
        },

        computed: {

            ...mapState([
                'archive'
            ]),

            index: {

                get () {
                    let id = +this.$route.query.id;
                    return this.archive.findIndex(project => project.id === id);
                },

                set (index) {
                    const id = this.archive[index] ? this.archive[index].id : undefined;
                    this.query({id});
                }

            },

            contain: {

                get () {
                    return this.$route.query.contain
                },

                set (value) {
                    this.query({contain: value ? value : undefined});
                }

            },

        },

        methods: {

            query (query) {
                this.$router.push({query: {
                    ...this.$route.query,
                    ...query
                }});
            },

            setScroll (value) {
                this.$el.scrollTop = value;
            },

            scroll (value, duration) {
                const from = this.$el.scrollTop;
                const to = this.$el.scrollTop + value;
                this.animation.from(from).to(to).duration(duration).start();

            }

        }

    }

</script>